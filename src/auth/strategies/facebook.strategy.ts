import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export default class FacebookStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        process.env.FACEBOOK_REDIRECT_URL ||
        'http://localhost:3000/auth/facebook-callback',
      scope: ['public_profile', 'user_birthday', 'email', 'user_gender'],
      profileFields: [
        'id',
        'displayName',
        'photos',
        'email',
        'birthday',
        'gender',
        'name',
      ],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile._json;
  }
}
