import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class UpsertFavouriteProductDto {
  @IsMongoId()
  product: string;

  @IsOptional()
  @IsMongoId()
  color?: string;

  @IsOptional()
  @IsMongoId()
  size?: string;

  @IsInt()
  quantity: number;
}
