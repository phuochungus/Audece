import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Size } from './schemas/size.schema';
import { Model } from 'mongoose';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size.name)
    private sizeModel: Model<Size>,
  ) {}

  async create(createSizeDto: CreateSizeDto) {
    const createdSize = new this.sizeModel({
      ...createSizeDto,
    });
    return await createdSize.save();
  }

  findAll() {
    return this.sizeModel.find().sort({ lable: -1 });
  }

  async findOne(id: string) {
    return await this.sizeModel.findById(id);
  }
}
