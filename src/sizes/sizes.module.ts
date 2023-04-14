import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Size } from './entities/size.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Size.name, schema: Size }])],
  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
