import { IsNumber, IsString } from 'class-validator';
import { Size } from '../schemas/size.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDto implements Size {
  @ApiProperty()
  @IsNumber()
  widthInCentimeter: number;

  @ApiProperty()
  @IsNumber()
  heightInCentimeter: number;

  @ApiProperty()
  @IsString()
  label: string;
}
