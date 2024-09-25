import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from '../todo-model/todo-model';
import { UpdateTodoDTO } from './DTO/updateTodo.dto';
import { AddTodoDTO } from './DTO/addTodo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: AddTodoDTO): Todo {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.listTodo();
  }

  @Get('/:id')
  getTodoById(@Param('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Put('/:id')
  modifierTodo(@Param('id') id: string, @Body() newTodo: UpdateTodoDTO) {
    return this.todoService.updateTodo(id, newTodo);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
