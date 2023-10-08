import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { User } from 'src/core/entities';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    // Kiểm tra xem email đã tồn tại hay chưa
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new Error('Email đã tồn tại.');
    }

    // Tạo tài khoản mới
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
