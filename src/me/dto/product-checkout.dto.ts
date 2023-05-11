import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProductCheckoutInfo } from 'src/orders/schemas/order.schema';

export class ProductCheckoutDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCheckoutInfo)
  productCheckoutInfos: ProductCheckoutInfo[];
}
