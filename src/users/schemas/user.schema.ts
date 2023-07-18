import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';
import { PercentSaleOffVoucher } from 'src/vouchers/schema/voucher.schema';

export enum gender {
  male,
  female,
}

export enum thirdParty {
  Google,
  Facebook,
}

export class UserVoucherInfo {
  voucher: PercentSaleOffVoucher | Types.ObjectId;
  remain: number;
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

  @Prop({ default: 'https://i.ibb.co/cFfccTd/User-1-1.png' })
  imageURL: string;

  @Prop({
    type: [
      {
        _id: false,
        voucher: {
          type: mongooseSchema.Types.ObjectId,
          ref: 'PercentSaleOffVoucher',
        },
        remain: Number,
      },
    ],
  })
  vouchers: UserVoucherInfo[];

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
  favouriteProducts: {
    product: Types.ObjectId;
    size: Types.ObjectId;
    color: Types.ObjectId;
    quantity: number;
  }[];

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
  purchaseHistory: {
    product: Types.ObjectId;
    size: Types.ObjectId;
    color: Types.ObjectId;
    quantity: number;
  }[];

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Order' }] })
  orders: Types.ObjectId[];

  @Prop()
  address: string;

  @Prop({ enum: thirdParty, default: null })
  isThirdPartyAccount: thirdParty | null;

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
  cart: {
    product: Types.ObjectId;
    size: Types.ObjectId;
    color: Types.ObjectId;
    quantity: number;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
