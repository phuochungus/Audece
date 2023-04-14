import { Module } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesController } from './sizes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Size, SizeSchema } from './entities/size.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Size.name, schema: SizeSchema }]),
  ],

  controllers: [SizesController],
  providers: [SizesService],
})
export class SizesModule {}
