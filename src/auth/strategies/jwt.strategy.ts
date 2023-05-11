import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Types, Document } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

export type UserDocument = Document<unknown, {}, User> &
  Omit<User & { _id: Types.ObjectId }, never>;

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<UserDocument> {
    const { _id } = payload;
    try {
      return await this.usersService.userModel.findOne({ _id });
    } catch (error) {
      if (error instanceof NotFoundException) throw new UnauthorizedException();
      else throw error;
    }
  }
}
