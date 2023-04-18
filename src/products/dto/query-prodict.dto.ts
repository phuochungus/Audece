import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  Min,
} from 'class-validator';

export default class QueryProductDTO {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  page: number;
}
