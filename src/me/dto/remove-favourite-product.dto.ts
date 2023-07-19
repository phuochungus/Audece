import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class RemoveFavourte {
  @IsMongoId()
  product: string;

  @IsOptional()
  @IsMongoId()
  size?: string;

  @IsOptional()
  @IsMongoId()
  color?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;
}
