import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Document } from 'mongoose';
import * as mongoose from 'mongoose';

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

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Collection' }] })
  collectionIds: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Category' }] })
  categoryIds: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Color' }] })
  colorIds: mongoose.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Size' }] })
  sizeIds: mongoose.Types.ObjectId[];

  @Prop()
  stablePrice: number;

  @Prop()
  currentPrice: number;

  @Prop()
  sold: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export default ProductSchema;
