import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDocument } from 'src/lib/entities';
import { User } from '../../lib/schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly service: Model<UserDocument>
  ) {}

  async findOne(data: FilterQuery<Partial<UserDocument>>): Promise<UserDocument> {
    return this.service.findOne(data);
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    return this.service.create(data);
  }
}
