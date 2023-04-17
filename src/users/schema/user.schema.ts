import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

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
  vouchers: { voucher: ObjectId; remain: number }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
