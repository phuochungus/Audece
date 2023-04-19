import { IsString, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;
}
