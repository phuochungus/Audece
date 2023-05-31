import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export default class QueryProductWithFilterDTO {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  min: number;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  max: number;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  page: number;
}
