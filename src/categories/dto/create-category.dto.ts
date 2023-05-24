import { Transform, Type } from 'class-transformer';
import {
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Types } from 'mongoose';
import { Category } from '../schema/category.schema';

export class CreateCategoryDto implements Category {
  @IsString()
  name: string;

  @IsMongoId({ each: true })
  childCategories: [];

  @IsOptional()
  @IsUrl()
  imageURL: string;
}
