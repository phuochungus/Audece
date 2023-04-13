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

  findOne(id: number) {
    return `This action returns a #${id} voucher`;
  }

  update(id: number, updateVoucherDto: UpdateVoucherDto) {
    return `This action updates a #${id} voucher`;
  }

  remove(id: number) {
    return `This action removes a #${id} voucher`;
  }
}
