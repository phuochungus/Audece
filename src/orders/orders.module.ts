import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { VouchersModule } from 'src/vouchers/vouchers.module';
import { ProductsModule } from 'src/products/products.module';
import OrderSchema, { Order } from './schemas/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    VouchersModule,
    ProductsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
