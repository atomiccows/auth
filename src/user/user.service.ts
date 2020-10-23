import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {User} from './user.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
    }

    async findAllUsers(): Promise<User[]> {
        try {
            return await this.userModel.find();
        } catch (error) {
            throw error;
        }
    }

    async findOneByEmail(email: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({email});
            return await this.userModel.findOne({email});
        } catch (e) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
    }

    async create(createUserInput: {email: string, password: string}): Promise<User> {
        const createdUser = new this.userModel(createUserInput);
        let user: User;
        try {
            user = await createdUser.save();
        } catch (error) {
            throw error;
        }
        return user;
    }
}
