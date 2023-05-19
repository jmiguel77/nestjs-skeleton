import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<any> {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    return this.usersRepository.insert(userEntity);
  }

  async getAll(): Promise<Array<User>> {
    const result = new Array<User>();
    const entities = await this.usersRepository.find();
    entities.forEach((e) => result.push(e));
    return result;
  }
}
