import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import JWTAuthGuard from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  @Get()
  @UseGuards(JWTAuthGuard)
  protected(@Request() req) {
    return req.user;
  }
}
