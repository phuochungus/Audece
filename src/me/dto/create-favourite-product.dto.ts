import { IsInt, IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpsertFavouriteProductDto {
  @IsMongoId()
  product: ObjectId;

  @IsOptional()
  @IsMongoId()
  color?: ObjectId;

  @IsOptional()
  @IsMongoId()
  size?: ObjectId;

  @IsInt()
  quantity: number;
}
