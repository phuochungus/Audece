import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
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
  collectionIds: ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Category' }] })
  categoryIds: ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Color' }] })
  colorIds: ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Size' }] })
  sizeIds: ObjectId[];

  @Prop()
  price: number;

  @Prop()
  saleOffPrice: number;

  @Prop()
  sold: number;

  saleOffByPercent: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.virtual('saleOffByPercent').get(function (this: ProductDocument) {
  return 1 - this.saleOffPrice / this.price;
});

export default ProductSchema;
