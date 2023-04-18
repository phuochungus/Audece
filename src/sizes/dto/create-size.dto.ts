import { IsNumber, IsString } from 'class-validator';
import { Size } from '../schemas/size.schema';

export class CreateSizeDto implements Size {
  @IsNumber()
  widthInCentimeter: number;

  @IsNumber()
  heightInCentimeter: number;

  @IsString()
  lable: string;
}
