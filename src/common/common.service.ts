import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class CommonService {
  uuid(): string {
    return v4();
  }

  static taille(validationData, type: 'min' | 'max'): string {
    let message: string;
    if (type === 'min') {
      message = `The length of your ${validationData.property} ${validationData.value} must be at least ${validationData.constraints[0]} characters long`;
    } else if (type === 'max') {
      message = `The length of your ${validationData.property} ${validationData.value} must be more than ${validationData.constraints[0]} characters long`;
    }
    return message;
  }
}
