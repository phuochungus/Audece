import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { ApiTags } from '@nestjs/swagger';
import { Query } from 'mongoose';

@ApiTags('sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizesService.create(createSizeDto);
  }

  @Get()
  findAll() {
    return this.sizesService.findAll();
  }

  @Get('/size/:id')
  async findOne(@Param('id') id: string) {
    return await this.sizesService.findOne(id);
  }
}
