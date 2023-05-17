import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';
import { UserDocument } from 'src/auth/strategies/jwt.strategy';
import { extend } from 'lodash';
import { PercentSaleOffVoucher } from 'src/vouchers/schema/voucher.schema';

export type OrderDocument = Document<unknown, {}, Order> &
  Omit<
    Order & {
      _id: Types.ObjectId;
    },
    never
  >;

@Injectable()
export class OrdersService {
  constructor(
    private readonly voucherService: VouchersService,
    @InjectModel(Order.name)
    public orderModel: Model<Order>,
  ) {}

  async create(userDoc: UserDocument, createOrderDto: CreateOrderDto) {
    let order: OrderDocument = new this.orderModel({
      ...createOrderDto,
      isDelivering: true,
      deliveryAddress: createOrderDto.deliveryAddress
        ? createOrderDto.deliveryAddress
        : userDoc.address,
    });

    const array = createOrderDto.productCheckoutInfos.map((e) => {
      return {
        color: new Types.ObjectId(e.color),
        size: new Types.ObjectId(e.size),
        product: new Types.ObjectId(e.product),
        quantity: e.quantity,
      };
    });
    userDoc.orders.unshift(order._id);
    userDoc.purchaseHistory.unshift(...array);

    if (createOrderDto.voucherId) {
      const voucher = await this.voucherService.percentSaleOffVoucherModel
        .findOne({
          _id: createOrderDto.voucherId,
        })
        .lean();
      if (!voucher) throw new NotFoundException('Not found voucher');

      extend(order, await this.voucherService.applyVoucher(order, voucher), {
        voucher: voucher._id,
      });

      for (let index = 0; index < userDoc.vouchers.length; index++) {
        let { voucher } = userDoc.vouchers[index];
        if (voucher.toString() == createOrderDto.voucherId) {
          userDoc.vouchers[index].remain--;
          break;
        }
      }
    }

    try {
      await Promise.all([order.save(), userDoc.save()]);
      return order;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async sortBestVoucher(
    userDocument: UserDocument,
    createOrderDto: CreateOrderDto,
  ) {
    let order: OrderDocument = new this.orderModel({
      ...createOrderDto,
    });

    await userDocument.populate({
      path: 'vouchers',
      populate: { path: 'voucher' },
    });
    let returnResults = [];
    for (let index = 0; index < userDocument.vouchers.length; index++) {
      const userVoucherInfo = userDocument.vouchers[index];
      if (this.voucherService.isValidVoucher(userVoucherInfo)) {
        const result = await this.voucherService.applyVoucher(
          order,
          userVoucherInfo.voucher as PercentSaleOffVoucher,
        );
        returnResults.push({
          voucher: userVoucherInfo.voucher,
          ...result,
        });
      }
    }
    returnResults.push({
      voucher: null,
      ...(await this.voucherService.applyVoucher(order)),
    });
    returnResults.sort((r1, r2) => {
      return r1.total - r2.total;
    });

    return returnResults;
  }
}
