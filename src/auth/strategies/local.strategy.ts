import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string) {
    const payload =
      await this.usersService.findUserMatchUsernameAndPasswordOrFail(
        username,
        password,
      );
    return payload;
  }
}
