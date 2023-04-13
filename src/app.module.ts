import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VouchersModule } from './vouchers/vouchers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VouchersModule,
    MongooseModule.forRoot(
      'mongodb+srv://dev:' +
        process.env.MONGO_PASSWORD +
        '@cluster0.av5bvih.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
