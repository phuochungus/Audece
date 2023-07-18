import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false, autoIndex: true })
export class Size {
  @Prop({ required: true })
  widthInCentimeter: number;

  @Prop({ required: true })
  heightInCentimeter: number;

  @Prop({ required: true })
  label: string;
}

export const SizeSchema = SchemaFactory.createForClass(Size);

SizeSchema.index(
  { widthInCentimeter: 1, heightInCentimeter: 1 },
  { unique: true },
);
