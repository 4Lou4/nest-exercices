import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { CommonService } from 'src/common/common.service';
import { TodoStatus } from 'src/enums/todo-status.enum';
import { AddTodoDTO } from './addTodo.dto';

export class UpdateTodoDTO extends PartialType(AddTodoDTO) {
  // @IsOptional()
  // @IsString()
  // @MinLength(3, {
  //   message: (args: ValidationArguments) => {
  //     return CommonService.taille(args, 'min');
  //   },
  // })
  // @MaxLength(15, {
  //   message: (args: ValidationArguments) => {
  //     return CommonService.taille(args, 'max');
  //   },
  // })
  // name: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(10, {
  //   message: (args: ValidationArguments) => {
  //     return CommonService.taille(args, 'min');
  //   },
  // })
  // description: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
