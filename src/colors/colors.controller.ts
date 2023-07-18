import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  BadGatewayException,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('colors')
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    try {
      return await this.colorsService.create(createColorDto);
    } catch (error) {
      if (error.code == 11000)
        throw new ConflictException('name, hex already existed');
      throw new BadGatewayException();
    }
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
