import { Type } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsMongoId, IsNumber, Min, IsString } from 'class-validator';
import { Types, mongo, Schema as mongooseSchema } from 'mongoose';
import { Color } from 'src/colors/schemas/color.schema';
import { Product } from 'src/products/schemas/product.schema';
import { Size } from 'src/sizes/schemas/size.schema';

export class ProductCheckoutInfo {
  @IsMongoId()
  product: string;

  @IsMongoId()
  size: string;

  @IsMongoId()
  color: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class DetailCheckoutInfo {
  @IsString()
  key: String;

  @IsString()
  value: String;
}

@Schema({ versionKey: false, id: true, timestamps: true })
export class Order {
  @Prop({
    type: [
      {
        product: { type: mongooseSchema.Types.ObjectId, ref: 'Product' },
        size: { type: mongooseSchema.Types.ObjectId, ref: 'Size' },
        color: { type: mongooseSchema.Types.ObjectId, ref: 'Color' },
        quantity: Number,
        _id: false,
      },
    ],
  })
  productCheckoutInfos: {
    product: Product;
    size: Size;
    color: Color;
    quantity: number;
  }[];

  @Prop()
  deliveryAddress: string;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'PercentSaleOffVoucher' })
  voucher: Types.ObjectId;

  @Prop({ type: [{ key: String, value: String, _id: false }] })
  details: DetailCheckoutInfo[];

  @Prop()
  total: number;

  @Prop()
  isDelivering: boolean;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export default OrderSchema;
