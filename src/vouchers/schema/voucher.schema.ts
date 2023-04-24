import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class PercentSaleOffVoucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  start: Date;

  @Prop({ required: true })
  end: Date;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ required: true })
  amountByPercent: number;

  @Prop()
  condition: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], required: true })
  appliableCategoryIds: Types.ObjectId[];
}

export const PercentSaleOffVoucherSchema = SchemaFactory.createForClass(
  PercentSaleOffVoucher,
);
