import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PercentSaleOffVoucher,
  PercentSaleOffVoucherSchema,
} from './entities/voucher.entity';

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
