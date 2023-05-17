import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateVoucherDto {
  @ApiProperty({ description: 'the name of voucher', example: 'Sale off 80%' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'start YYYY-MM-DD', example: '2023-04-01' })
  @IsDateString()
  start: Date;

  @ApiProperty({ description: 'end YYYY-MM-DD', example: '2023-10-15' })
  @IsDateString()
  end: Date;

  @ApiProperty({
    description: 'code to activate voucher',
    example: 'SALEOFF80',
  })
  @IsString()
  code: string;

  @ApiProperty({ description: 'vouchers quantity', example: 500 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'amount reward by percent', example: 30 })
  @IsNumber()
  amountByPercent: number;

  @ApiProperty({
    description: 'apply categories',
    example: ['640a129eb236c9802faca75c'],
  })
  @IsOptional()
  @IsMongoId({ each: true })
  appliableCategories: string[];
}
