import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import UpdateUserDto from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateAddressDTO } from './dto/update-address.dto';

@Controller()
@UseGuards(JWTAuthGuard)
export class MeController {
  constructor(
    private readonly meService: MeService,
    private usersService: UsersService,
  ) {}

  @Get()
  findOne(@CurrentUser() userDoc: any) {
    return userDoc;
  }

  @Patch()
  async update(
    @CurrentUser() userDoc: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUserInfo(userDoc, updateUserDto);
  }

  @Patch('/address')
  async updateAddress(
    @CurrentUser() userDoc,
    @Body() updateAddressDTO: UpdateAddressDTO,
  ) {
    await this.meService.updateAddress(userDoc, updateAddressDTO);
  }
}
