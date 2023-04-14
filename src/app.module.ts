import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VouchersModule } from './vouchers/vouchers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VouchersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dev:' +
        process.env.MONGO_PASSWORD +
        '@cluster0.av5bvih.mongodb.net/Audace_db?retryWrites=true&w=majority',
    ),
    SizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
