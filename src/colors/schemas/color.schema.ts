import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Color {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  hex: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
