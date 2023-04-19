import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum gender {
  male,
  female,
}

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop()
  fullname: string;

  @Prop({ default: undefined })
  password: string | undefined;

  @Prop()
  phone: string;

  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop({ enum: gender, default: undefined })
  gender: string | undefined;

  @Prop()
  birth: Date;

  @Prop({
    type: [
      {
        _id: false,
        voucher: {
          type: Types.ObjectId,
          ref: 'PercentSaleOffVoucher',
        },
        remain: Number,
      },
    ],
  })
  vouchers: { voucher: Types.ObjectId; remain: number }[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  favouriteProducts: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orders: Types.ObjectId[];

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
