import { ObjectId, Types } from 'mongoose';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { IsMongoObjectIdString } from 'src/decorators/is-objectId.decorator';
import { PercentSaleOffVoucher } from '../entities/voucher.entity';
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

  @IsMongoObjectIdString({ each: true })
  appliableCategoryIds: ObjectId[];
}
