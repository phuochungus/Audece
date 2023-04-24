import { IsString } from 'class-validator';

export default class SaveVoucherDTO {
  @IsString()
  code: string;
}
