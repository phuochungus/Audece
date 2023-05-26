import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-oauth2.guard';
import { FacebookAuthGuard } from './guards/facebook-oauth2.guard';
import UserGoogleProfileDTO from './dto/user-google-profile.dto';
import UserFacebookProfileDTO from './dto/user-facebook-profile.dto';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { tokenDTO } from './dto/token.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: LoginDTO })
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: tokenDTO })
  @Post('/local')
  login(@Request() req): tokenDTO {
    return {
      accessToken: this.authService.generateAccessTokenString(req.user._id),
    };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle(@Res() res: Response) {
    res.sendStatus(301);
  }

  @Get('/google-callback')
  @UseGuards(GoogleAuthGuard)
  @ApiCreatedResponse({ type: tokenDTO })
  createOrLoginIfExist(@Request() req: any): Promise<tokenDTO> {
    let user = new UserGoogleProfileDTO(req.user);
    return this.authService.createAccountOrGenerateAccessTokenIfExist(user);
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  loginFacebook() {}

  @Get('/facebook-callback')
  @UseGuards(FacebookAuthGuard)
  @ApiCreatedResponse({ type: tokenDTO })
  createFacebookOrLoginIfExist(@Request() req: any): Promise<tokenDTO> {
    let user = new UserFacebookProfileDTO(req.user);
    return this.authService.createAccountOrGenerateAccessTokenIfExist(user);
  }
}
