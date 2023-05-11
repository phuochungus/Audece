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
import ObjectIdStringValidationPipe from 'src/pipes/validate-mongoId.pipe';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    return await this.vouchersService.create(createVoucherDto);
  }

  @Get()
  async findAll() {
    return await this.vouchersService.findAll();
  }

  @Get('/voucher/:id')
  async findOne(
    @Param('id', ObjectIdStringValidationPipe) voucherId: string,
  ) {
    return await this.vouchersService.findOne(voucherId);
  }

  @Patch('/voucher/:id')
  async update(
    @Param('id', ObjectIdStringValidationPipe) voucherId: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ) {
    return await this.vouchersService.update(voucherId, updateVoucherDto);
  }

  @Delete('/voucher/:id')
  async remove(@Param('id', ObjectIdStringValidationPipe) voucherId: string) {
    return this.vouchersService.remove(voucherId);
  }
}
