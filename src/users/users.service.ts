import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

export interface UsersService {
  create(user: User): Promise<any>;

  getAll(): Promise<Array<User>>;
}

@Injectable()
export class DefaultUsersService implements UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(user: User): Promise<any> {
    const userEntity = new UserEntity();
    userEntity.name = user.name;
    userEntity.email = user.email;
    return this.usersRepository.create(userEntity);
  }

  async getAll(): Promise<Array<User>> {
    const result = new Array<User>();
    const entities = await this.usersRepository.getAll();
    entities.forEach((e) => result.push(e));
    return result;
  }
}
