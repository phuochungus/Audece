import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [OrdersModule, UsersModule, ProductsModule],
  controllers: [MeController],
  providers: [MeService],
  exports: [MeService],
})
export class MeModule {}
