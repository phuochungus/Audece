import { gender } from '../schemas/user.schema';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsMobilePhone('vi-VN')
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string | undefined;

  @IsOptional()
  @IsEnum(gender)
  gender: gender | undefined;

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  birth: Date;

  @IsOptional()
  @IsString()
  address: string;
}
