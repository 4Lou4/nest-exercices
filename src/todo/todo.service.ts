import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from '../todo-model/todo-model';

@Injectable()
export class TodoService {
  private todos: TodoModel[] = [];

  create(todo: TodoModel): TodoModel {
    const { name, description, status } = todo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }

    const newTodo: TodoModel = {
      id,
      name,
      description,
      creationDate: new Date(),
      status,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  listTodo(): TodoModel[] {
    console.log('works');
    return this.todos;
  }

  getTodoById(id: number): TodoModel {
    const todo = this.todos.find((acttodo) => acttodo.id === id);
    if (todo) {
      return todo;
    }
    throw new NotFoundException(`Todo with id ${id} not found`);
  }

  updateTodo(id: number, newTodo: Partial<TodoModel>): TodoModel {
    const todo = this.getTodoById(id);
    todo.description = newTodo.description
      ? newTodo.description
      : todo.description;
    todo.name = newTodo.name ? newTodo.name : todo.name;
    todo.status = newTodo.status ? newTodo.status : todo.status;
    return todo;
  }

  deleteTodo(id: number) {
    // Chercher l'objet via son id dans le tableau des todos
    const index = this.todos.findIndex((todo) => todo.id === +id);
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
