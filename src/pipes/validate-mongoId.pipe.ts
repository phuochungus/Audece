import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';
import { isValidObjectId } from 'mongoose';

@Injectable()
export default class ValidateMongoIdPipe
  implements PipeTransform<string, string>
{
  transform(value: string, metadata: ArgumentMetadata): string {
    if (isValidObjectId(value)) return value;
    throw new BadRequestException(
      'Validation failed (objectID string is expected)',
    );
  }
}
