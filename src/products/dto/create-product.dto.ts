import mongoose, { ObjectId } from 'mongoose';
import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Product } from '../schemas/product.schema';
import { Type } from 'class-transformer';

export class CreateProductDto implements Product {
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
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  collectionIds: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  categoryIds: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  colorIds: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => mongoose.Types.ObjectId)
  sizeIds: mongoose.Types.ObjectId[];

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
