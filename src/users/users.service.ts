import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isEmail } from 'class-validator';
import { hashSync, genSaltSync } from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (isEmail(createUserDto.username)) {
      createUserDto.email = createUserDto.username;
      createUserDto.username = undefined;
    }

    const hashedPassword = hashSync(
      createUserDto.password,
      process.env.SECRET_SALT,
    );

    createUserDto.password = hashedPassword;

    const createdUser = new this.userModel({ ...createUserDto });

    try {
      return await createdUser.save();
    } catch (error) {
      if (error.code == 11000)
        throw new ConflictException({
          message: 'username or email is already taken',
        });
      throw error;
    }
  }

  async findOne(id: string) {
    const user = await this.userModel.find({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByEmail(email: string) {
    if (!isEmail(email)) throw new ConflictException();
    const user = await this.userModel.find({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.find({ username });
    if (!user) throw new NotFoundException();
    return user;
  }
}
