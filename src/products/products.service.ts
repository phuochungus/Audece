import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import QueryProductDTO from './dto/query-prodict.dto';

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
      })
      .lean();
  }

  async findOne(objectId: string) {
    return await this.productModel
      .findOne({ _id: objectId })
      .select(['-createdAt', '-updatedAt'])
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
      })
      .lean();
  }

  async update(objectId: string, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOneAndUpdate(
      { _id: objectId },
      updateProductDto,
    );
    if (!product) throw new NotFoundException();
  }

  async findBestSellers(queryProductDto: QueryProductDTO) {
    return await this.productModel.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          imageURL: 1,
          price: 1,
          saleOffPrice: 1,
        },
      },
      {
        $addFields: {
          isFavourite: false,
        },
      },
      {
        $sort: {
          sold: -1,
        },
      },
      {
        $skip: 15 * queryProductDto.page,
      },
      { $limit: 15 },
    ]);
  }

  async findBestSaleOff(queryProductDto: QueryProductDTO) {
    return await this.productModel.aggregate([
      {
        $project: {
          _id: 1,
          name: 1,
          imageURL: 1,
          price: 1,
          saleOffPrice: 1,
        },
      },
      {
        $addFields: {
          percentSaleOff: {
            $subtract: [1, { $divide: ['$saleOffPrice', '$price'] }],
          },
        },
      },
      {
        $sort: { pecentSaleOff: -1 },
      },
      {
        $skip: 15 * queryProductDto.page,
      },
      { $limit: 15 },
    ]);
  }
}
