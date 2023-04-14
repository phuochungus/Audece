import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PercentSaleOffVoucher,
  PercentSaleOffVoucherSchema,
} from './schema/voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PercentSaleOffVoucher.name, schema: PercentSaleOffVoucherSchema },
    ]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
