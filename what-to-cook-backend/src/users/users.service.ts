import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {
//   private readonly users: User[];

constructor(@InjectModel('User') private readonly userModel: Model<User>) { 
    // this.users = [
    //   {
    //     userId: 1,
    //     username: 'john',
    //     password: 'changeme',
    //   },
    //   {
    //     userId: 2,
    //     username: 'chris',
    //     password: 'secret',
    //   },
    //   {
    //     userId: 3,
    //     username: 'maria',
    //     password: 'guess',
    //   },
    // ];
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({email:email});
    return user;
  }
async getAllUsers(): Promise<User[]> {
    const user = await this.userModel.find().exec();
    return user;
}
  async addUser(user: User): Promise<User> {
    const newUser = await new this.userModel(user);
    return newUser.save();
}
}