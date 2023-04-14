import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PercentSaleOffVoucher } from './schema/voucher.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(PercentSaleOffVoucher.name)
    private percentSaleOffVoucherModel: Model<PercentSaleOffVoucher>,
  ) {}

  async create(
    createVoucherDto: CreateVoucherDto,
  ): Promise<PercentSaleOffVoucher> {
    const createdPercentVoucher = new this.percentSaleOffVoucherModel({
      ...createVoucherDto,
    });
    return await createdPercentVoucher.save();
  }

  async findAll() {
    return await this.percentSaleOffVoucherModel
      .find({})
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const voucher = await this.percentSaleOffVoucherModel.findOne({ _id: id });
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
}
