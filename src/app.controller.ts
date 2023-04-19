import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import LocalAuthGuard from './auth/guards/local-auth.guard';
import JWTAuthGuard from './auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return {
      accessToken: this.authService.generateAccessTokenString(req.user._id),
    };
  }

  @Get()
  @UseGuards(JWTAuthGuard)
  protected(@Request() req) {
    return req.user;
  }
}
