import { TodoStatus } from 'src/enums/todo-status.enum';

export class UpdateTodoDTO {
  name: string;
  description: string;
  status: TodoStatus;
}
