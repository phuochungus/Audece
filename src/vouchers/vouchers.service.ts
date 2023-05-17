import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PercentSaleOffVoucher } from './schema/voucher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { DetailCheckoutInfo } from 'src/orders/schemas/order.schema';
import { OrderDocument } from 'src/orders/orders.service';
import { UserVoucherInfo } from 'src/users/schemas/user.schema';

export type VoucherLeanDocument = FlattenMaps<PercentSaleOffVoucher> & {
  _id: Types.ObjectId;
};

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(PercentSaleOffVoucher.name)
    public readonly percentSaleOffVoucherModel: Model<PercentSaleOffVoucher>,
  ) {}

  async create(createVoucherDto: CreateVoucherDto) {
    try {
      const createdPercentVoucher = new this.percentSaleOffVoucherModel({
        ...createVoucherDto,
      });
      await createdPercentVoucher.save();
    } catch (error) {
      if (error.code == 11000)
        throw new ConflictException('code already exist');
      throw error;
    }
  }

  async findAll(): Promise<
    (FlattenMaps<PercentSaleOffVoucher> & { _id: Types.ObjectId })[]
  > {
    return await this.percentSaleOffVoucherModel
      .find({})
      .lean()
      .sort({ createdAt: -1 });
  }

  async findOne(id: string): Promise<
    FlattenMaps<PercentSaleOffVoucher> & {
      _id: Types.ObjectId;
    }
  > {
    const voucher = await this.percentSaleOffVoucherModel
      .findOne({ _id: id })
      .lean();
    if (voucher) return voucher;
    throw new NotFoundException();
  }

  async update(voucherId: string, updateVoucherDto: UpdateVoucherDto) {
    const voucher = await this.percentSaleOffVoucherModel.findOneAndUpdate(
      { _id: voucherId },
      updateVoucherDto,
    );
    if (!voucher) throw new NotFoundException();
  }

  async remove(voucherId: string) {
    const voucher = await this.percentSaleOffVoucherModel.deleteOne({
      _id: voucherId,
    });
    if (!voucher) throw new NotFoundException();
  }

  async applyVoucher(
    order: OrderDocument,
    voucher?: PercentSaleOffVoucher,
  ): Promise<{ details: DetailCheckoutInfo[]; total: number }> {
    let details: DetailCheckoutInfo[] = [];
    await Promise.all([
      order.populate({
        path: 'productCheckoutInfos',
        populate: { path: 'product' },
      }),
      order.populate({
        path: 'productCheckoutInfos',
        populate: { path: 'size' },
      }),
      order.populate({
        path: 'productCheckoutInfos',
        populate: { path: 'color' },
      }),
    ]);
    let total = order.productCheckoutInfos.reduce((accumulate, current) => {
      return accumulate + current.product.currentPrice * current.quantity;
    }, 0);
    order.productCheckoutInfos.sort((p1, p2) => {
      return p2.product.currentPrice - p1.product.currentPrice;
    });
    for (let index = 0; index < order.productCheckoutInfos.length; index++) {
      const product = order.productCheckoutInfos[index];
      details.push({
        key: product.product.name,
        value: `${product.product.currentPrice * product.quantity} VND`,
      });
    }
    let discount = 0;
    if (voucher) {
      for (let index = 0; index < order.productCheckoutInfos.length; index++) {
        const productCheckoutInfo = order.productCheckoutInfos[index];
        if (
          this.isVoucherAppicableToProduct(productCheckoutInfo.product, voucher)
        ) {
          discount =
            productCheckoutInfo.product.currentPrice *
            (voucher.amountByPercent / 100.0);
          details.push({
            key: `Total discount (${voucher.name})`,
            value: `${discount} VND`,
          });
          break;
        }
      }
    }
    let finalTotal = total - discount;
    details.push({ key: 'Total price', value: `${finalTotal} VND` });
    return { details, total: finalTotal };
  }

  private isVoucherAppicableToProduct(
    product: Product,
    voucher: PercentSaleOffVoucher,
  ): boolean {
    const intersect = voucher.appliableCategories.filter((voucherCategory) =>
      product.categories.some(
        (category) => category._id.toString() == voucherCategory._id.toString(),
      ),
    );
    if (intersect.length) return true;
    return false;
  }

  isValidVoucher(voucher: UserVoucherInfo): boolean {
    if (
      (voucher.voucher as PercentSaleOffVoucher).end.getTime() > Date.now() &&
      voucher.remain
    )
      return true;
    return false;
  }
}
