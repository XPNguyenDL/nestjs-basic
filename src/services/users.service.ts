import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../models/user/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../core/entities';
import { UserProfileDto } from '../models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService) { }

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

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UserProfileDto) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      // If the user is not found, return null or handle the error accordingly
      return null;
    }

    // Update the user's profile with the new data
    Object.assign(user, updateUserDto);

    // Save the updated user
    const updatedUser = await user.save();

    return updatedUser;
  }

  async setAvatar(user: User, avatar: string, public_id: string) {

    if (!user) {
      // If the user is not found, return null or handle the error accordingly
      return null;
    }

    const updateUserDto = {
      avatarUrl: avatar,
      publicUrl: public_id
    }

    // Update the user's profile with the new data
    Object.assign(user, updateUserDto);

    return await user.save();
  }

  async remove(id: string) {
    const existingUser = await this.userModel.findOne({ _id: id }).exec();
    if (!existingUser) {
      throw new Error('User is deleted.');
    }
    return await this.userModel.deleteOne({ _id: id });
  }
}
