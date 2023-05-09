import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export default class QueryProductDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  page: number = 0;
}
