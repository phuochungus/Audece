import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
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

  @Prop()
  quantity: number;

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
