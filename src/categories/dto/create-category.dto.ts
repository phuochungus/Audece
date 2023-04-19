import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { Category } from '../schema/category.schema';

export class CreateCategoryDto implements Category {
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Types.ObjectId)
  childCategories: Types.ObjectId[];

  @IsOptional()
  @IsUrl()
  imageURL: string;
}
