import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserDocument } from 'src/auth/strategies/jwt.strategy';
import { ApiTags, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { SortVoucherResponse } from './dto/sort-best-voucher-response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  async create(
    @CurrentUser() user: UserDocument,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.create(user, createOrderDto);
  }

  @Post('/sort_best_vouchers')
  @ApiCreatedResponse({ type: [SortVoucherResponse] })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  async SortBestVoucher(
    @CurrentUser() userDocument: UserDocument,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return await this.ordersService.sortBestVoucher(
      userDocument,
      createOrderDto,
    );
  }
}
