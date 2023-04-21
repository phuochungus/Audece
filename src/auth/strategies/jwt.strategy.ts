import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const { _id } = payload;
    try {
      return await this.userModel
        .findOne({ _id })
        .select(['-password'])
        .populate({
          path: 'vouchers',
          populate: { path: 'voucher' },
          options: { sort: { createdAt: -1 } },
        })
        .populate({
          path: 'favouriteProducts',
          populate: {
            path: 'product',
          },
        });
    } catch (error) {
      if (error instanceof NotFoundException) throw new UnauthorizedException();
      else throw error;
    }
  }
}
