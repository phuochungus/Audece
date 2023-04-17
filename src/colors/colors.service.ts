import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './schemas/color.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel(Color.name)
    private colorModel: Model<Color>,
  ) {}

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const createdColor = new this.colorModel({ ...createColorDto });
    return createdColor.save();
  }

  async findAll() {
    return await this.colorModel
      .find({})
      .sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.colorModel.findOne({_id: id});
  }

  async update(colorId: string, updateColorDto: UpdateColorDto) {
    await this.colorModel.findOneAndUpdate(
      { _id: colorId },
      updateColorDto,
    );
  }

  async remove(colorId: string) {
    return await this.colorModel.deleteOne({ _id: colorId });
  }
}
