import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Collection } from './schemas/collection.schema';
import { FlattenMaps, Model, Types } from 'mongoose';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<Collection>,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    const createdCollection = new this.collectionModel({
      ...createCollectionDto,
    });
    return createdCollection.save();
  }

  async findAll(): Promise<
    FlattenMaps<Collection> &
      {
        _id: Types.ObjectId;
      }[]
  > {
    return await this.collectionModel
      .find()
      .sort({ createdAt: -1 })
      .select(['-createdAt', '-updatedAt', '-productIds'])
      .lean();
  }

  async findOne(
    id: string,
  ): Promise<FlattenMaps<Collection> & { _id: Types.ObjectId }> {
    return await this.collectionModel
      .findOne({ _id: id })
      .sort({ createdAt: -1 })
      .populate({ path: 'products' })
      .lean();
  }
}
