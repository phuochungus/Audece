import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorsService.create(createColorDto);
  }

  @Get()
  findAll() {
    return this.colorsService.findAll();
  }

  @Get('/color/:colorId')
  findOne(@Param('colorId') colorId: string) {
    return this.colorsService.findOne(colorId);
  }

  @Patch('/color/:colorId')
  update(
    @Param('colorId') colorId: string,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return this.colorsService.update(colorId, updateColorDto);
  }

  @Delete('/color/:colorId')
  remove(@Param('colorId') colorId: string) {
    return this.colorsService.remove(colorId);
  }
}
