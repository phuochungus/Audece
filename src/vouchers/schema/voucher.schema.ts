import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PercentSaleOffVoucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true })
  amountByPercent: number;

  @Prop({ required: true })
  condition: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], required: true })
  appliableCategoryIds: Types.ObjectId[];
}

export const PercentSaleOffVoucherSchema = SchemaFactory.createForClass(
  PercentSaleOffVoucher,
);
