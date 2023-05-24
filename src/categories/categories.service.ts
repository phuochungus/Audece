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

  async findAll(withImage: boolean) {
    let categories = this.categoryModel
      .find({})
      .select({
        createdAt: 0,
        updatedAt: 0,
      })
      .sort({ createdAt: -1 })
      .populate({
        path: 'childCategories',
        select: { createdAt: 0, updatedAt: 0 },
      });
    if (withImage == false)
      categories.select({
        imageURL: 0,
      });
    return await categories;
  }

  async findOne(id: string) {
    return await this.categoryModel
      .findOne({ _id: id })
      .populate('childCategories');
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
