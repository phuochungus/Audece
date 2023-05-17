import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PercentSaleOffVoucherResponseDTO {
  @ApiProperty({ description: 'string' })
  _id: string;
  @ApiProperty({ description: 'the name of voucher', example: 'Sale off 80%' })
  name: string;

  @ApiProperty({ description: 'start YYYY-MM-DD', example: '2023-04-01' })
  start: Date;

  @ApiProperty({ description: 'end YYYY-MM-DD', example: '2023-10-15' })
  end: Date;

  @ApiProperty({
    description: 'code to activate voucher',
    example: 'SALEOFF80',
  })
  code: string;

  @ApiProperty({ description: 'vouchers quantity', example: 500 })
  quantity: number;

  @ApiProperty({ description: 'amount reward by percent', example: 30 })
  amountByPercent: number;

  @ApiProperty({
    description: 'apply categories',
    example: ['640a129eb236c9802faca75c'],
  })
  appliableCategories: Types.ObjectId[];
}
