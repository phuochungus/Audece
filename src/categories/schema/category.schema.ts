import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    childCategories: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
