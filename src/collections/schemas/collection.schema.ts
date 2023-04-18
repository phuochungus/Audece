import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoos, { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Collection {
  @Prop()
  name: string;

  @Prop()
  imageURL: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  productIds: Types.ObjectId[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
