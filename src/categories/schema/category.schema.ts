import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Category' }],
    required: true,
    default: undefined,
  })
  childCategories: Types.ObjectId[] | undefined;

  @Prop({ required: true })
  imageURL: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
