import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../todo-model/todo-model.entity';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { AddTodoDTO } from './DTO/addTodo.dto';
import { TodoStatus } from 'src/enums/todo-status.enum';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todo: AddTodoDTO, @Req() req: any): Promise<Todo> {
    return await this.todoService.create(todo, req.userId);
  }

  @Get()
  async findAll(@Req() req: any): Promise<Todo[]> {
    return await this.todoService.listTodo(req.userId);
  }

  @Get('/:id')
  async getTodoById(@Param('id') id: string, @Req() req: any): Promise<Todo> {
    return await this.todoService.getTodoById(id, req.userId);
  }

  @Put('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() newTodo: UpdateTodoDTO,
    @Req() req: any,
  ): Promise<Todo> {
    return await this.todoService.updateTodo(id, newTodo, req.userId);
  }

  @Delete('/:id')
  async deleteTodo(@Param('id') id: string, @Req() req: any): Promise<string> {
    return await this.todoService.deleteTodo(id, req.userId);
  }
}
