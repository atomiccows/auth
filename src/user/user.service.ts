import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>) {}

    async findAllUsers(): Promise<UserType[]> {
        try {
          return await this.userModel.find().exec();
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email: string): Promise<UserType> {
        try {
            return await this.userModel.findOne({email});
        } catch (e) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async create(createUserInput: {email: string, password: string}): Promise<UserType> {
        const createdUser = new this.userModel(createUserInput);
        try {
            return await createdUser.save();
        } catch (error) {
            throw error;
        }
    }
}
