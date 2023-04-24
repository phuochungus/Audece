import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { isEmail } from 'class-validator';
import { compareSync, hashSync } from 'bcrypt';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import UpdateUserDto from './dto/update-user.dto';
import { extend } from 'lodash';
import { UpdateAddressDTO } from 'src/me/dto/update-address.dto';
import SaveVoucherDTO from 'src/me/dto/save-voucher.dto';
import { PercentSaleOffVoucher } from 'src/vouchers/schema/voucher.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(PercentSaleOffVoucher.name)
    private voucherModel: Model<PercentSaleOffVoucher>,
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

  private async findOneByEmailOrFail(
    email: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    if (!isEmail(email)) throw new ConflictException();
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  private async findOneByUsernameOrFail(
    username: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    const user = await this.userModel.findOne({ username }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  async findUserMatchUsernameAndPasswordOrFail(
    username: string,
    password: string,
  ): Promise<{ _id: Types.ObjectId }> {
    let user: User & { _id: Types.ObjectId };
    if (isEmail(username)) {
      user = await this.findOneByEmailOrFail(username);
    } else {
      user = await this.findOneByUsernameOrFail(username);
    }
    if (!user) throw new NotFoundException();
    const hashedPassword = user.password;
    if (compareSync(password, hashedPassword)) {
      return { _id: user._id };
    }
    throw new UnauthorizedException();
  }

  async updateUserInfo(userDoc: any, updateUserDto: UpdateUserDto) {
    extend(userDoc, updateUserDto);
    await userDoc.save();
  }

  async updateAddress(userDoc: any, updateAddressDto: UpdateAddressDTO) {
    extend(userDoc, updateAddressDto);
    await userDoc.save();
  }

  async saveVoucher(userDoc: any, saveVoucherDto: SaveVoucherDTO) {
    const voucherCode = saveVoucherDto.code;
    let userVouchers: {
      voucher: any;
      remain: number;
    }[] = userDoc.vouchers;
    for (let index in userVouchers) {
      if (userVouchers[index].voucher.code == voucherCode) return;
    }

    const voucher = await this.voucherModel.findOne({ code: voucherCode });

    if (voucher.quantity > 0) {
      voucher.quantity -= 1;
      userDoc.vouchers.push({ voucher: voucher._id, remain: 1 });
      userDoc.save();
      voucher.save();
    } else throw new ForbiddenException();
  }
}
