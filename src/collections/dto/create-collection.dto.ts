import { Types } from 'mongoose';
import { Collection } from '../schemas/collection.schema';
import { IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { IsMongoObjectIdString } from 'src/decorators/is-objectId.decorator';

export class CreateCollectionDto implements Collection {
  @IsString()
  name: string;

  @IsUrl()
  imageURL: string;

  @IsMongoObjectIdString({ each: true })
  @Type(() => Types.ObjectId)
  productIds: Types.ObjectId[];
}
