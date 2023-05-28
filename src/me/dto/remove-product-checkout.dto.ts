import { IsMongoId } from 'class-validator';

export class RemoveProductCheckoutDTO {
  @IsMongoId({ each: true })
  productIds: string[];
}
