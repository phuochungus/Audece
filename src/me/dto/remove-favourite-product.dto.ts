import { IsInt, IsMongoId } from 'class-validator';

export class RemoveFavourte {
  @IsMongoId()
  product: string;

  @IsMongoId()
  size: string;
  
  @IsMongoId()
  color: string;

  @IsInt()
  quantity: number;
}
