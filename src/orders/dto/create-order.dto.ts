import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCheckoutInfo } from '../schemas/order.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ type: [ProductCheckoutInfo] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCheckoutInfo)
  productCheckoutInfos: ProductCheckoutInfo[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  voucherId?: string;
}
