import { ObjectId } from 'mongoose';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  isURL,
} from 'class-validator';
import { IsMongoObjectIdString } from 'src/decorators/is-objectId.decorator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  description: string;

  @IsUrl()
  imageURL: string;

  @IsOptional()
  @IsMongoObjectIdString({ each: true })
  collectionIds: ObjectId[];

  @IsOptional()
  @IsMongoObjectIdString({ each: true })
  categoryIds: ObjectId[];

  @IsOptional()
  @IsMongoObjectIdString({ each: true })
  colorIds: ObjectId[];

  @IsOptional()
  @IsMongoObjectIdString({ each: true })
  sizeIds: ObjectId[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  saleOffPrice: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  sold: number;
}
