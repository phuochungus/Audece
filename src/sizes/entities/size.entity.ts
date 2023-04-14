import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Size {
  @Prop({ required: true })
  widthInCentimeter: number;

  @Prop({ required: true })
  heightInCentimeter: number;

  @Prop({ required: true })
  lable: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
