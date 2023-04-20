import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import UpdateUserDto from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get('/me')
  @UseGuards(JWTAuthGuard)
  findOne(@CurrentUser() userDoc: any) {
    return userDoc;
  }

  @Patch('/me')
  @UseGuards(JWTAuthGuard)
  async update(
    @CurrentUser() userDoc: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUserInfo(userDoc, updateUserDto);
  }
}
