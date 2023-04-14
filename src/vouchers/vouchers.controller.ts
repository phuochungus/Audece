import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import ParseObjectIdStringPipe from 'src/pipes/parse-objectID-string.pipe';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.vouchersService.create(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.vouchersService.findAll();
  }

  @Get('/voucher/:voucherId')
  findOne(@Param('voucherId', ParseObjectIdStringPipe) voucherId: string) {
    return this.vouchersService.findOne(voucherId);
  }

  @Patch('/voucher/:voucherId')
  update(
    @Param('voucherId', ParseObjectIdStringPipe) voucherId: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return this.vouchersService.update(voucherId, updateVoucherDto);
  }

  @Delete('/voucher/:voucherId')
  remove(@Param('voucherId', ParseObjectIdStringPipe) voucherId: string) {
    return this.vouchersService.remove(voucherId);
  }
}
