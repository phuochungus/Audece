import { Collection } from '../schemas/collection.schema';
import { IsMongoId, IsString, IsUrl } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsUrl()
  imageURL: string;

  @IsMongoId({ each: true })
  products: string[];
}
