import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { gender } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullname: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMobilePhone('vi-VN')
  phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(gender, { message: 'gender must be male or female' })
  gender: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  birth: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  imageURL: string;
}
