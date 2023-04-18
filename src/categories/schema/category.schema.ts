import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Category' }],
    default: undefined,
  })
  childCategories: Types.ObjectId[] | undefined;

  @Prop({ default: undefined })
  imageURL: string | undefined;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
