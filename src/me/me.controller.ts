import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Post,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Delete,
} from '@nestjs/common';
import { MeService } from './me.service';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import UpdateUserDto from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateAddressDTO } from './dto/update-address.dto';
import SaveVoucherDTO from './dto/save-voucher.dto';
import { UserDocument } from 'src/auth/strategies/jwt.strategy';
import ValidateMongoIdPipe from 'src/pipes/validate-mongoId.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductCheckoutDTO } from './dto/product-checkout.dto';
import { RemoveProductCheckoutDTO } from './dto/remove-product-checkout.dto';

@ApiTags('me')
@Controller()
@UseGuards(JWTAuthGuard)
export class MeController {
  constructor(
    private readonly meService: MeService,
    private usersService: UsersService,
  ) {}

  @Get('/profile')
  async showProfile(@CurrentUser() userDocument: UserDocument) {
    return userDocument;
  }

  @Get('/vouchers')
  async showVouchers(@CurrentUser() userDocument: UserDocument) {
    return await this.meService.showVouchers(userDocument);
  }

  @Get('/orders')
  async showOrders(
    @CurrentUser() userDocument: UserDocument,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ) {
    return await this.meService.showOrders(userDocument, page);
  }

  @Get('/history')
  async showHistoryItem(@CurrentUser() userDocument: UserDocument) {
    return await this.meService.showHistory(userDocument);
  }

  @Patch()
  async update(
    @CurrentUser() userDocument: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUserInfo(userDocument, updateUserDto);
  }

  @Patch('/address')
  async updateAddress(
    @CurrentUser() userDocument: UserDocument,
    @Body() updateAddressDTO: UpdateAddressDTO,
  ) {
    await this.usersService.updateAddress(userDocument, updateAddressDTO);
  }

  @Post('/save_voucher')
  async saveVoucher(
    @CurrentUser() userDocument: UserDocument,
    @Body() saveVoucherDto: SaveVoucherDTO,
  ) {
    await this.usersService.saveVoucher(userDocument, saveVoucherDto);
  }

  @Get('/favourites')
  async showFavourites(@CurrentUser() userDocument: UserDocument) {
    return await this.meService.showFavourite(userDocument);
  }
  @Post('/favourites')
  async saveToFavourites(
    @CurrentUser() userDocument: UserDocument,
    @Body('id', ValidateMongoIdPipe) id: string,
  ) {
    await this.meService.saveFavourites(userDocument, id);
  }

  @Delete('/favourites')
  async removeFromFavourites(
    @CurrentUser() userDocument: UserDocument,
    @Body('id', ValidateMongoIdPipe) id: string,
  ) {
    await this.meService.removeFromFavourite(userDocument, id);
  }

  @Post('/cart')
  async addToCart(
    @CurrentUser() userDocument: UserDocument,
    @Body() productCheckoutDTO: ProductCheckoutDTO,
  ) {
    await this.meService.pushToCart(userDocument, productCheckoutDTO);
  }

  @Delete('/cart')
  async removeFromCart(
    @CurrentUser() userDocument: UserDocument,
    @Body() removeProductCheckoutDTO: RemoveProductCheckoutDTO,
  ) {
    await this.meService.removeFromCart(userDocument, removeProductCheckoutDTO);
  }

  @Patch('/cart')
  async updateCart(
    @CurrentUser() userDocument: UserDocument,
    @Body() productCheckoutDTO: ProductCheckoutDTO,
  ) {
    await this.meService.updateCart(userDocument, productCheckoutDTO);
  }
}
