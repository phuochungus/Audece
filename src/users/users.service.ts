import {
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { isEmail } from 'class-validator';
import { compareSync, hashSync } from 'bcrypt';
import { FlattenMaps, Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import FullUpdateUserDto from './dto/update-user.dto';
import { extend } from 'lodash';
import { UpdateAddressDTO } from 'src/me/dto/update-address.dto';
import SaveVoucherDTO from 'src/me/dto/save-voucher.dto';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { UserDocument } from 'src/auth/strategies/jwt.strategy';
import { PercentSaleOffVoucher } from 'src/vouchers/schema/voucher.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    public readonly userModel: Model<User>,
    private readonly vouchersService: VouchersService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = hashSync(
      createUserDto.password,
      process.env.SECRET_SALT,
    );

    createUserDto.password = hashedPassword;

    let createUserDtoAfterTranform = {};

    if (isEmail(createUserDto.usernameOrEmail)) {
      createUserDtoAfterTranform = {
        ...createUserDtoAfterTranform,
        email: createUserDto.usernameOrEmail,
      };
    } else {
      createUserDtoAfterTranform = {
        ...createUserDtoAfterTranform,
        username: createUserDto.usernameOrEmail,
      };
    }

    createUserDtoAfterTranform = {
      ...createUserDtoAfterTranform,
      password: hashedPassword,
    };

    const createdUser = new this.userModel({ ...createUserDtoAfterTranform });

    try {
      await createdUser.save();
    } catch (error) {
      if (error.code == 11000)
        throw new ConflictException({
          message: 'username or email is already taken',
        });
      throw error;
    }
  }

  async findOneOrFail(id: string) {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  private async findOneByEmail(
    email: string,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    if (!isEmail(email)) throw new ConflictException();
    const user = await this.userModel.findOne({ email }).lean();
    return user;
  }

  private async findOneByUsername(
    username: string,
  ): Promise<FlattenMaps<User> & { _id: Types.ObjectId }> {
    const user = await this.userModel.findOne({ username }).lean();
    return user;
  }

  async findUserMatchUsernameAndPasswordOrFail(
    username: string,
    password: string,
  ): Promise<{ _id: Types.ObjectId }> {
    let user: FlattenMaps<User> & { _id: Types.ObjectId };

    if (isEmail(username)) {
      user = await this.findOneByEmail(username);
    } else {
      user = await this.findOneByUsername(username);
    }
    if (!user) throw new NotFoundException();
    const hashedPassword = user.password;
    if (compareSync(password, hashedPassword)) {
      return { _id: user._id };
    }
    throw new UnauthorizedException();
  }

  async updateUserInfo(
    userDocument: UserDocument,
    updateUserDto: FullUpdateUserDto,
  ) {
    extend(userDocument, updateUserDto);
    await userDocument.save();
  }

  async updateAddress(
    userDocument: UserDocument,
    updateAddressDto: UpdateAddressDTO,
  ) {
    extend(userDocument, updateAddressDto);
    await userDocument.save();
  }

  async saveVoucher(
    userDocument: UserDocument,
    saveVoucherDto: SaveVoucherDTO,
  ) {
    const voucherCode = saveVoucherDto.code;

    await userDocument.populate({
      path: 'vouchers',
      populate: { path: 'voucher' },
    });

    const voucher =
      await this.vouchersService.percentSaleOffVoucherModel.findOne({
        code: voucherCode,
      });

    if (
      userDocument.vouchers.filter(
        (e) => (e.voucher as PercentSaleOffVoucher).code == voucherCode,
      ).length != 0
    )
      throw new ConflictException('Voucher has already saved');

    if (voucher.quantity > 0) {
      voucher.quantity -= 1;
      userDocument.vouchers.unshift({ voucher: voucher._id, remain: 1 });
      try {
        await Promise.all([userDocument.save(), voucher.save()]);
      } catch (error) {
        throw new BadGatewayException();
      }
    } else throw new ForbiddenException();
  }
}
