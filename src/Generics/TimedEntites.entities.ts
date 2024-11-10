import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export class TimedEntites {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
