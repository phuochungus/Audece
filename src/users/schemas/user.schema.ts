import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export enum gender {
  male,
  female,
}

export enum thirdParty {
  Google,
  Facebook,
}

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true, sparse: true })
  username: string | null;

  @Prop({ unique: true, sparse: true })
  email: string | null;

  @Prop()
  fullname: string;

  @Prop({ default: undefined })
  password: string | undefined;

  @Prop()
  phone: string;

  @Prop({ enum: gender, default: undefined })
  gender: string | undefined;

  @Prop()
  birth: Date;

  @Prop()
  imageURL: string;

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

  @Prop({ enum: thirdParty, default: null })
  isThirdPartyAccount: thirdParty | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
