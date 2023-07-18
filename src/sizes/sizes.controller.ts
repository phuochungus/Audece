import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
  BadGatewayException,
} from '@nestjs/common';
import { SizesService } from './sizes.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sizes')
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Post()
  async create(@Body() createSizeDto: CreateSizeDto) {
    try {
      return await this.sizesService.create(createSizeDto);
    } catch (error) {
      if (error.code == 11000)
        throw new ConflictException('heigh and width already defined');
      throw new BadGatewayException();
    }
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
