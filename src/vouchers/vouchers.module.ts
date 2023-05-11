import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PercentSaleOffVoucher,
  PercentSaleOffVoucherSchema,
} from './schema/voucher.schema';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PercentSaleOffVoucher.name, schema: PercentSaleOffVoucherSchema },
    ]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService],
  exports: [VouchersService],
})
export class VouchersModule {}
