import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Color {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  hex: `#${string}`;

  @Prop({required: true})
  appliableCategoryIds: ObjectId[];
}

export const ColorSchema = SchemaFactory.createForClass(
  Color,
);