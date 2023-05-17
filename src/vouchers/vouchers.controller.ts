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
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PercentSaleOffVoucherResponseDTO } from './dto/voucher-response.dto';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @ApiConflictResponse({ description: 'code already exist' })
  @ApiCreatedResponse({ description: 'created successfully' })
  @Post()
  async create(@Body() createVoucherDto: CreateVoucherDto) {
    return await this.vouchersService.create(createVoucherDto);
  }

  @ApiTags('voucher')
  @ApiOkResponse({ type: [PercentSaleOffVoucherResponseDTO] })
  @Get()
  async findAll() {
    return await this.vouchersService.findAll();
  }

  @ApiTags('voucher')
  @ApiOkResponse({ type: [PercentSaleOffVoucherResponseDTO] })
  @Get('/voucher/:id')
  async findOne(@Param('id', ObjectIdStringValidationPipe) voucherId: string) {
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
