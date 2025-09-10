import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name)
    UserModel: Model<User>,
  ) {
    super(UserModel);
  }
}
