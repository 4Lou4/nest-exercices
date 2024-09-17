import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoModel } from '../todo-model/todo-model';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: TodoModel): TodoModel {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(): TodoModel[] {
    return this.todoService.listTodo();
  }

  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    id,
  ) {
    return this.todoService.getTodoById(id);
  }

  @Put(':id')
  modifierTodo(
    @Param('id', ParseIntPipe) id,
    @Body() newTodo: Partial<TodoModel>,
  ) {
    return this.todoService.updateTodo(id, newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id) {
    return this.todoService.deleteTodo(id);
  }
}
