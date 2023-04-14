import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { PercentSaleOffVoucher } from './entities/voucher.entity';
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
    return createdPercentVoucher.save();
  }

  async findAll() {
    return await this.percentSaleOffVoucherModel
      .find({})
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.percentSaleOffVoucherModel.findOne({ _id: id });
  }

  async update(voucherId: string, updateVoucherDto: UpdateVoucherDto) {
    await this.percentSaleOffVoucherModel.findOneAndUpdate(
      { _id: voucherId },
      updateVoucherDto,
    );
  }

  async remove(voucherId: string) {
    return await this.percentSaleOffVoucherModel.deleteOne({ _id: voucherId });
  }
}
