import { IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString({each: true})
    childCategories: string[];
}
