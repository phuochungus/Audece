import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ example: 'user' })
  password: string;
}

