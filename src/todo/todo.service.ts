import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../todo-model/todo-model';
import { AddTodoDTO } from './DTO/addTodo.dto';
import { TodoStatus } from 'src/enums/todo-status.enum';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { CommonService } from 'src/common/common.service';
@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  @Inject()
  private commonservice: CommonService;

  create(todo: AddTodoDTO): Todo {
    const { name, description } = todo;
    let id;
    id = this.commonservice.uuid();

    const newTodo: Todo = {
      id,
      name,
      description,
      creationDate: new Date(),
      status: TodoStatus.EnAttente,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  listTodo(): Todo[] {
    console.log('works well');
    return this.todos;
  }

  getTodoById(id: string): Todo {
    const todo = this.todos.find((acttodo) => acttodo.id === id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`Todo with id ${id} not found`);
  }

  updateTodo(id: string, newTodo: UpdateTodoDTO): Todo {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }

  deleteTodo(id: string) {
    // Chercher l'objet via son id dans le tableau des todos
    const index = this.todos.findIndex((todo) => todo.id === id);
    // Utiliser la méthode splice pour supprimer le todo s'il existe
    if (index >= 0) {
      this.todos.splice(index, 1);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    // Sinon je vais déclencher une erreur
    return {
      message: `Le todo d'id ${id} a été supprimé avec succès`,
      count: 1,
    };
  }
}
