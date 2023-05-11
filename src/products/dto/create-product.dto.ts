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
  @IsMongoId({ each: true })
  collections: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  categories: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  colors: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  sizes: string[];

  @IsNumber()
  @Min(0)
  stablePrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  currentPrice: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  sold: number;
}
