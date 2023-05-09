import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export default class QueryProductWithFilterDTO {
  @IsOptional()
  @IsNumber()
  @Min(0)
  page: number = 0;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsNumber()
  @Min(45000)
  min: number;

  @IsNumber()
  @Max(10000000)
  max: number;
}
