import { TodoStatus } from '../enums/todo-status.enum';

export class Todo {
  id: string;

  name: string;

  description: string;

  creationDate: Date;

  status: TodoStatus;
}
