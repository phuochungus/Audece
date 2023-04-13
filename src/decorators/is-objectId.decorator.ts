import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { isObjectIdOrHexString, isValidObjectId } from 'mongoose';

export function IsMongoObjectId(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMongoObjectId',
      propertyName,
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isObjectIdOrHexString(value);
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Mongo ObjectId String`;
        },
      },
    });
  };
}
