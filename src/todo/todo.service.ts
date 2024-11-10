import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Todo } from '../todo-model/todo-model.entity';
import { AddTodoDTO } from './DTO/addTodo.dto';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoStatus } from 'src/enums/todo-status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(todoDto: AddTodoDTO, userId: string): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      ...todoDto,
      userId, // Associate the todo with the authenticated user's ID
    });
    return await this.todoRepository.save(newTodo);
  }

  async listTodo(userId: string): Promise<Todo[]> {
    // Only return todos that belong to the authenticated user
    return await this.todoRepository.find({ where: { userId } });
  }

  async getTodoById(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
      throw new NotFoundException(
        `Todo with id ${id} does not exist or does not belong to you`,
      );
    }
    return todo;
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDTO,
    userId: string,
  ): Promise<Todo> {
    const todo = await this.getTodoById(id, userId);
    if (!todo) {
      throw new UnauthorizedException(
        `You are not authorized to update this todo`,
      );
    }

    // Update only allowed fields
    todo.description = updateTodoDto.description ?? todo.description;
    todo.name = updateTodoDto.name ?? todo.name;
    todo.status = updateTodoDto.status ?? todo.status;
    todo.priority = updateTodoDto.priority ?? todo.priority;

    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string, userId: string): Promise<string> {
    const todo = await this.getTodoById(id, userId);
    if (!todo) {
      throw new UnauthorizedException(
        `You are not authorized to delete this todo`,
      );
    }

    await this.todoRepository.softDelete(id);
    return `Todo with id ${id} has been deleted`;
  }

  async restorerTodo(id: string, userId: string): Promise<string> {
    const todo = await this.getTodoById(id, userId);
    if (!todo) {
      throw new UnauthorizedException(
        `You are not authorized to restore this todo`,
      );
    }

    await this.todoRepository.restore(id);
    return `Todo with id ${id} has been restored`;
  }

  async countTodosByStatus(
    userId: string,
  ): Promise<{ [key in TodoStatus]: number }> {
    const enAttenteCount = await this.todoRepository.count({
      where: { status: TodoStatus.EnAttente, userId },
    });
    const enCoursCount = await this.todoRepository.count({
      where: { status: TodoStatus.EnCours, userId },
    });
    const termineCount = await this.todoRepository.count({
      where: { status: TodoStatus.Finalise, userId },
    });

    return {
      [TodoStatus.EnAttente]: enAttenteCount,
      [TodoStatus.EnCours]: enCoursCount,
      [TodoStatus.Finalise]: termineCount,
    };
  }

  async findTodos(
    userId: string,
    nameOrDescription?: string,
    status?: TodoStatus,
  ): Promise<Todo[]> {
    const query = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId }); // Filter by userId

    if (nameOrDescription) {
      query.andWhere(
        'todo.name LIKE :search OR todo.description LIKE :search',
        { search: `%${nameOrDescription}%` },
      );
    }

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    return query.getMany();
  }

  async getAllTodos(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Todo[]> {
    const [todos, total] = await this.todoRepository.findAndCount({
      where: { userId }, // Filter by userId
      skip: (page - 1) * limit,
      take: limit,
    });
    return todos;
  }
}
