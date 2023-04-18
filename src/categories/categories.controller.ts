import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('category/:categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.categoriesService.findOne(categoryId);
  }

  @Patch('category/:categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Delete('category/:categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categoriesService.remove(categoryId);
  }
}
