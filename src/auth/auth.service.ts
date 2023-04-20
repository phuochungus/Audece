import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, thirdParty } from 'src/users/schemas/user.schema';
import UserGoogleProfileDTO from './dto/user-google-profile.dto';
import ThirdPartyDTO from './dto/transform-imp';
import UserFacebookProfileDTO from './dto/user-facebook-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  generateAccessTokenString(userId: string): string {
    return this.jwtService.sign({ _id: userId });
  }

  async createAccountOrGenerateAccessTokenIfExist(
    userProfile: ThirdPartyDTO,
  ): Promise<{ accessToken: string }> {
    const userWithMatchEmail = await this.userModel.findOne({
      email: userProfile.email,
    });

    if (
      userWithMatchEmail &&
      this.isSameThirdParty(userProfile, userWithMatchEmail)
    ) {
      return {
        accessToken: this.generateAccessTokenString(
          userWithMatchEmail._id.toString(),
        ),
      };
    } else if (
      userWithMatchEmail &&
      !this.isSameThirdParty(userProfile, userWithMatchEmail)
    ) {
      throw new UnauthorizedException();
    } else {
      const user = new this.userModel({
        ...userProfile.makeCreateUserDto(),
        isThirdPartyAccount: this.getThirdParty(userProfile),
      });
      await user.save();
      return {
        accessToken: this.generateAccessTokenString(user._id.toString()),
      };
    }
  }

  private getThirdParty(user: any): thirdParty {
    if (user instanceof UserFacebookProfileDTO) return thirdParty.Facebook;
    if (user instanceof UserGoogleProfileDTO) return thirdParty.Google;
  }

  private isSameThirdParty(userRequested: any, userExisted: User) {
    if (this.getThirdParty(userRequested) == userExisted.isThirdPartyAccount)
      return true;
    return false;
  }
}
