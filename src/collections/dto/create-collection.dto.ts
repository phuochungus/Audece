import { Types } from 'mongoose';
import { Collection } from '../schemas/collection.schema';
import { IsMongoId, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCollectionDto implements Collection {
  @IsString()
  name: string;

  @IsUrl()
  imageURL: string;

  @IsMongoId({ each: true })
  @Type(() => Types.ObjectId)
  productIds: Types.ObjectId[];
}
