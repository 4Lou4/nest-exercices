import { TimedEntites } from 'src/Generics/TimedEntites.entities';
import { TodoStatus } from '../enums/todo-status.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todo')
export class Todo extends TimedEntites {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    length: 50,
    unique: true,
  })
  name: string;

  @Column({
    length: 200,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.EnAttente,
  })
  status: string;

  @Column()
  priority: number;

  @Column()
  userId: string;
}
