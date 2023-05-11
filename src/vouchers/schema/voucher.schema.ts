import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';

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

  @Prop({
    type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Category' }],
    required: true,
  })
  appliableCategories: Types.ObjectId[];
}

export const PercentSaleOffVoucherSchema = SchemaFactory.createForClass(
  PercentSaleOffVoucher,
);
