import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Size } from '../entities/size.entity';

export class CreateSizeDto implements Size {
  @IsNumber()
  widthInCentimeter: number;

  @IsNumber()
  heightInCentimeter: number;

  @IsNumber()
  @IsOptional()
  depthInCentimeter: number | null;

  @IsString()
  lable: string;
}
