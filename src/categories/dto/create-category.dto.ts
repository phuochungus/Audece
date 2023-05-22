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

  // @IsOptional()
  // @IsMongoId({ each: true })
  // @IsObject({ each: true })
  // @Transform(({ value }) => new Types.ObjectId(value))
  @IsMongoId({ each: true })
  childCategories: [];

  @IsOptional()
  @IsUrl()
  imageURL: string;
}
