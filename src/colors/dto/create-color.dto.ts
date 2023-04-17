import { IsHexColor, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString()
  name: string;

  @IsString()
  @IsHexColor()
  hex: string;
}
