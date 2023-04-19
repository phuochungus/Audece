import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ObjectIdStringValidationPipe from 'src/pipes/validate-mongoId.pipe';
import QueryProductDTO from './dto/query-prodict.dto';

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
  findOne(@Param('id', ObjectIdStringValidationPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Patch('/product/:id')
  update(
    @Param('id', ObjectIdStringValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Get('best-sellers')
  async findBestSellers(@Query() queryProductDto: QueryProductDTO) {
    return await this.productsService.findBestSellers(queryProductDto);
  }

  @Get('best-sale-off')
  async findBestSaleOff(@Query() queryProductDto: QueryProductDTO) {
    return await this.productsService.findBestSaleOff(queryProductDto);
  }
}
