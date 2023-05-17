import { PercentSaleOffVoucher } from 'src/vouchers/schema/voucher.schema';
import { ApiProperty } from '@nestjs/swagger';
import { DetailCheckoutInfo } from '../schemas/order.schema';
import { IntersectionType } from '@nestjs/swagger';

class _idDTO {
  @ApiProperty()
  _id: string;
}

class BaseVoucher extends IntersectionType(PercentSaleOffVoucher, _idDTO) {}

export class SortVoucherResponse {
  @ApiProperty()
  voucher: BaseVoucher;

  @ApiProperty({ type: [DetailCheckoutInfo] })
  detail: DetailCheckoutInfo[];

  @ApiProperty()
  total: number;
}
