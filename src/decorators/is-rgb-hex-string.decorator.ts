import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { isObjectIdOrHexString } from 'mongoose';

export function IsRGBHexString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRGBHexString',
      propertyName,
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const pattern = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
          return pattern.test(value);
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a Mongo ObjectId String`;
        },
      },
    });
  };
}
