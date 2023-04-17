import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ParseObjectIdStringPipe from 'src/pipes/parse-objectID-string.pipe';
import mongoose, { ObjectId } from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get('/product/:id')
  findOne(@Param('id', ParseObjectIdStringPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch('/product/:id')
  update(
    @Param('id', ParseObjectIdStringPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get('best-sellers')
  async findBestSellers() {
    return await this.productsService.findBestSellers();
  }

  @Get('best-sale-off')
  async findBestSaleOff() {
    return await this.productsService.findBestSaleOff();
  }
}
