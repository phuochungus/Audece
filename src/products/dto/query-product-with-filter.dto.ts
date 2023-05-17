import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export default class QueryProductWithFilterDTO {
  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @Min(0)
  min: number;

  @IsNumber()
  @Min(0)
  max: number;
}
