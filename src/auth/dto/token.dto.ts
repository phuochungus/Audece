import { ApiProperty } from '@nestjs/swagger';

export class tokenDTO {
  @ApiProperty()
  accessToken: string;
}
