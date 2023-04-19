import {
  ConflictException,
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
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
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

  async findOne(id: string): Promise<User & { _id: Types.ObjectId }> {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  private async findOneByEmail(
    email: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    if (!isEmail(email)) throw new ConflictException();
    const user = await this.userModel.findOne({ email }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  private async findOneByUsername(
    username: string,
  ): Promise<User & { _id: Types.ObjectId }> {
    const user = await this.userModel.findOne({ username }).lean();
    if (!user) throw new NotFoundException();
    return user;
  }

  async findUserIdMatchUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<{ _id: Types.ObjectId }> {
    let user: User & { _id: Types.ObjectId };
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
}
