import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductCheckoutInfo } from '../schemas/order.schema';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCheckoutInfo)
  productCheckoutInfos: ProductCheckoutInfo[];

  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @IsOptional()
  @IsMongoId()
  voucherId?: string;
}
