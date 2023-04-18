import { ObjectId } from 'mongoose';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { PercentSaleOffVoucher } from '../schema/voucher.schema';
import { IsMongoObjectIdString } from 'src/decorators/is-objectId.decorator';

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
  @IsMongoObjectIdString({ each: true })
  appliableCategoryIds: ObjectId[];
}
