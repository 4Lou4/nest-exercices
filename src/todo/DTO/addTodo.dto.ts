import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { CommonService } from 'src/common/common.service';

export class AddTodoDTO {
  @IsNotEmpty()
  @MinLength(3, {
    message: (args: ValidationArguments) => {
      return CommonService.taille(args, 'min');
    },
  })
  @MaxLength(15, {
    message: (args: ValidationArguments) => {
      return CommonService.taille(args, 'max');
    },
  })
  name: string;

  @IsNotEmpty()
  @MinLength(10, {
    message: (args: ValidationArguments) => {
      return CommonService.taille(args, 'min');
    },
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  priority: number;
}
