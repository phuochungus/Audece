import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import JWTAuthGuard from 'src/auth/guards/jwt-auth.guard';
import ValidateMongoIdPipe from 'src/pipes/validate-mongoId.pipe';
import { User } from './schemas/user.schema';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get('/user/:id')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.usersService.findOneOrFail(id);
  }

  @Patch()
  @UseGuards(JWTAuthGuard)
  // @UseInterceptors(UserInterceptor)
  update(@CurrentUser() user: User) {
    return user;
  }
}
