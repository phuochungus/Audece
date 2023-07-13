import { IsInt, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpsertFavouriteProductDto {
  @IsMongoId()
  product: ObjectId;

  @IsMongoId()
  color: ObjectId;

  @IsMongoId()
  size: ObjectId;

  @IsInt()
  quantity: number;
}
