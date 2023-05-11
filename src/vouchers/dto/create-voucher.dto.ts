import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVoucherDto {
  @IsString()
  name: string;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;

  @IsString()
  code: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  amountByPercent: number;

  @IsOptional()
  @IsMongoId({ each: true })
  appliableCategories: string[];
}
