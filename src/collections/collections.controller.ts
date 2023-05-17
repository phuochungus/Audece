import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import ObjectIdStringValidationPipe from 'src/pipes/validate-mongoId.pipe';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { MarkUserFavouriteProductsInterceptor } from 'src/interceptors/mark-user-favourite-products.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @ApiTags('collections')
  @Get()
  async findAll() {
    return await this.collectionsService.findAll();
  }

  @Get('/collection/:id')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(MarkUserFavouriteProductsInterceptor)
  findOne(@Param('id', ObjectIdStringValidationPipe) id: string) {
    return this.collectionsService.findOne(id);
  }
}
