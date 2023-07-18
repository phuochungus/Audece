import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsString,
  IsUrl,
} from 'class-validator';
import { gender } from '../schemas/user.schema';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export default class FullUpdateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  fullname: string;

  @ApiProperty({ required: false })
  @IsMobilePhone('vi-VN')
  phone: string;

  @ApiProperty({ required: false })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsEnum(gender, { message: 'gender must be male or female' })
  gender: string;

  @ApiProperty({ required: false })
  @IsDateString()
  birth: Date;

  @ApiProperty({ required: false })
  @IsUrl()
  imageURL: string;
}

export class UpdateUserDto extends PartialType(FullUpdateUserDto) {}
