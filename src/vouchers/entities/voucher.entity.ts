import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class PercentSaleOffVoucher {
  @Prop()
  name: string;

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop()
  code: string;

  @Prop()
  amountByPercent: number;

  @Prop()
  condition: string;

  @Prop()
  appliableCategoryIds: ObjectId[];
}

export const PercentSaleOffVoucherSchema = SchemaFactory.createForClass(PercentSaleOffVoucher);
