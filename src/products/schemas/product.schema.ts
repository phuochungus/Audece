import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types, Schema as mongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;

  @Prop()
  rating: number;

  @Prop()
  description: string;

  @Prop()
  imageURL: string;

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Collection' }] })
  collections: Types.ObjectId[];

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Category' }] })
  categories: Types.ObjectId[];

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Color' }] })
  colors: ObjectId[];

  @Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Size' }] })
  sizes: ObjectId[];

  @Prop()
  stablePrice: number;

  @Prop()
  currentPrice: number;

  @Prop()
  sold: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export default ProductSchema;
