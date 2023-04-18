import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
    });
    return await createdCategory.save();
  }

  async findAll() {
    return await this.categoryModel.find({}).sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return await this.categoryModel.findOne({ _id: id });
  }

  async update(voucherId: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryModel.findOneAndUpdate(
      { _id: voucherId },
      updateCategoryDto,
    );
  }

  async remove(voucherId: string) {
    return await this.categoryModel.deleteOne({
      _id: voucherId,
    });
  }
}
