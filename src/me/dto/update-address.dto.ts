import { IsString } from 'class-validator';

export class UpdateAddressDTO {
  @IsString()
  address: string;
}
