import {
  IsNotEmpty,
  Max,
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
}
