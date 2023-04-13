import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class PercentSaleOffVoucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  amountByPercent: number;

  @Prop({ required: true })
  condition: string;

  @Prop({ required: true })
  appliableCategoryIds: ObjectId[];
}

export const PercentSaleOffVoucherSchema = SchemaFactory.createForClass(
  PercentSaleOffVoucher,
);
