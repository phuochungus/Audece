import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Res,
  Query,
} from '@nestjs/common';
import LocalAuthGuard from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-oauth2.guard';
import { FacebookAuthGuard } from './guards/facebook-oauth2.guard';
import UserGoogleProfileDTO from './dto/user-google-profile.dto';
import UserFacebookProfileDTO from './dto/user-facebook-profile.dto';
import { ApiBody, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { tokenDTO } from './dto/token.dto';

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
  loginGoogle(@Res() res) {}

  @Get('/google-callback')
  @UseGuards(GoogleAuthGuard)
  @ApiCreatedResponse({ type: tokenDTO })
  async createOrLoginIfExist(@Request() req: any, @Res() res) {
    let user = new UserGoogleProfileDTO(req.user);
    const { accessToken } =
      await this.authService.createAccountOrGenerateAccessTokenIfExist(user);
    res
      .status(302)
      .redirect(
        'http://localhost:3000/auth/redirect?access_token=' + accessToken,
      );
  }

  @Get('/redirect')
  getAccessToken(@Query('access_token') token: string) {
    console.log(1);
    return token;
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  loginFacebook() {}

  @Get('/facebook-callback')
  @UseGuards(FacebookAuthGuard)
  @ApiCreatedResponse({ type: tokenDTO })
  async createFacebookOrLoginIfExist(@Request() req: any, @Res() res) {
    let user = new UserFacebookProfileDTO(req.user);
    const { accessToken } =
      await this.authService.createAccountOrGenerateAccessTokenIfExist(user);

    res
      .status(302)
      .redirect(
        'http://localhost:3000/auth/redirect?access_token=' + accessToken,
      );
  }
}
