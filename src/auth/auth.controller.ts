import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-oauth2.guard';
import { FacebookAuthGuard } from './guards/facebook-oauth2.guard';
import UserGoogleProfileDTO from './dto/user-google-profile.dto';
import UserFacebookProfileDTO from './dto/user-facebook-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local')
  @UseGuards(LocalAuthGuard)
  login(@Request() req) {
    return {
      accessToken: this.authService.generateAccessTokenString(req.user._id),
    };
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('/google-callback')
  @UseGuards(GoogleAuthGuard)
  createOrLoginIfExist(@Request() req: any): Promise<{ accessToken: string }> {
    let user = new UserGoogleProfileDTO(req.user);
    return this.authService.createAccountOrGenerateAccessTokenIfExist(user);
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  loginFacebook() {}

  @Get('/facebook-callback')
  @UseGuards(FacebookAuthGuard)
  createFacebookOrLoginIfExist(@Request() req: any) {
    let user = new UserFacebookProfileDTO(req.user);
    return this.authService.createAccountOrGenerateAccessTokenIfExist(user);
  }
}
