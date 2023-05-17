import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  usernameOrEmail: string;

  @ApiProperty()
  @IsString()
  password: string;
}
