import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Collection {
  @Prop()
  name: string;

  @Prop()
  imageURL: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
