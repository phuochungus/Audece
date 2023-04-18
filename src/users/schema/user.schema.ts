import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { type } from 'os';

export enum gender {
  male,
  female,
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  fullname: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ enum: gender, default: undefined })
  gender?: string;

  @Prop()
  birth: Date;

  @Prop({
    type: [
      {
        _id: false,
        voucher: {
          type: mongoose.Types.ObjectId,
          ref: 'PercentSaleOffVoucher',
        },
        remain: Number,
      },
    ],
  })
  vouchers: { voucher: mongoose.Types.ObjectId; remain: number }[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Product' }] })
  favouriteProducts: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
