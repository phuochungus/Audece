import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(usernameOrEmail: string, password: string) {
    const payload =
      await this.usersService.findUserMatchUsernameAndPasswordOrFail(
        usernameOrEmail,
        password,
      );
    return payload;
  }
}
