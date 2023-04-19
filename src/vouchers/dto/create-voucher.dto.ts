import { Types } from 'mongoose';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PercentSaleOffVoucher } from '../schema/voucher.schema';
import { Type } from 'class-transformer';

export class CreateVoucherDto implements PercentSaleOffVoucher {
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

  @IsString()
  condition: string;

  @IsOptional()
  @IsMongoId({ each: true })
  @Type(() => Types.ObjectId)
  appliableCategoryIds: Types.ObjectId[];
}
