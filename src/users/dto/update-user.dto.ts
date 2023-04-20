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

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsMobilePhone('vi-VN')
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(gender, { message: 'gender must be male or female' })
  gender: string;

  @IsOptional()
  @IsDateString()
  birth: Date;

  @IsOptional()
  @IsUrl()
  imageURL: string;
}
