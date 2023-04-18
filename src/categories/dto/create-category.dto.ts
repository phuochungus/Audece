import { Type } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { IsMongoObjectIdString } from 'src/decorators/is-objectId.decorator';
import { Category } from '../schema/category.schema';

export class CreateCategoryDto implements Category {
  @IsString()
  name: string;

  @IsMongoObjectIdString({ each: true })
  @Type(() => Types.ObjectId)
  childCategories: Types.ObjectId[];

  @IsUrl()
  imageURL: string;
}
