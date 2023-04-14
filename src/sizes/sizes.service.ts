import { Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Size } from './entities/size.entity';
import { Model } from 'mongoose';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size.name)
    private sizeModel: Model<Size>,
  ) {}

  create(createSizeDto: CreateSizeDto) {
    const createdSize = new this.sizeModel({
      ...createSizeDto,
    });
    return createdSize.save();
  }

  findAll() {
    return this.sizeModel.find().sort({ lable: -1 });
  }
}
