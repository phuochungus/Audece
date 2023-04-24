import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { MeModule } from 'src/me/me.module';
import {
  PercentSaleOffVoucher,
  PercentSaleOffVoucherSchema,
} from 'src/vouchers/schema/voucher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PercentSaleOffVoucher.name, schema: PercentSaleOffVoucherSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
