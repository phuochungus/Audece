import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel({
      ...createProductDto,
    });
    return await createdProduct.save();
  }

  async findAll() {
    return await this.productModel
      .find()
      .select(['-createdAt', '-updatedAt'])
      .sort({ createdAt: -1 })
      .populate({
        path: 'colorIds',
        select: {
          _id: 0,
          name: 1,
          hex: 1,
        },
      })
      .populate({
        path: 'sizeIds',
        select: {
          _id: 0,
          widthInCentimeter: 1,
          heightInCentimeter: 1,
          lable: 1,
        },
      });
  }

  async findOne(objectId: string) {
    return await this.productModel
      .findOne({ _id: objectId })
      .select(['-createdAt', '-updatedAt'])
      .sort({ createdAt: -1 })
      .populate({
        path: 'colorIds',
        select: {
          _id: 0,
          name: 1,
          hex: 1,
        },
      })
      .populate({
        path: 'sizeIds',
        select: {
          _id: 0,
          widthInCentimeter: 1,
          heightInCentimeter: 1,
          lable: 1,
        },
      });
  }

  async update(objectId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOneAndUpdate(
      { _id: objectId },
      updateProductDto,
    );
    if (!product) throw new NotFoundException();
  }

  async findBestSellers() {
    return await this.productModel
      .find()
      .select(['-createdAt', '-updatedAt'])
      .sort({ createdAt: -1 })
      .limit(15)
      .populate({
        path: 'colorIds',
        select: {
          _id: 0,
          name: 1,
          hex: 1,
        },
      })
      .populate({
        path: 'sizeIds',
        select: {
          _id: 0,
          widthInCentimeter: 1,
          heightInCentimeter: 1,
          lable: 1,
        },
      });
  }

  async findBestSaleOff() {
    return await this.productModel.aggregate([
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
      {
        $addFields: {
          percentSaleOff: {
            $subtract: [1, { $divide: ['$saleOffPrice', '$price'] }],
          },
        },
      },
      { $limit: 15 },
      {
        $lookup: {
          from: 'colors',
          localField: 'colorIds',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
          as: 'colors',
        },
      },
      {
        $lookup: {
          from: 'sizes',
          localField: 'sizeIds',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
          as: 'sizes',
        },
      },
      {
        $project: {
          colorIds: 0,
          sizeIds: 0,
        },
      },
    ]);
  }
}
