import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface UsersRepository {
  create(entity: UserEntity): Promise<any>;

  getAll(): Promise<Array<UserEntity>>;
}

export class DBUsersRepository implements UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(entity: UserEntity): Promise<any> {
    return this.repository.insert(entity);
  }

  async getAll(): Promise<Array<UserEntity>> {
    return this.repository.find();
  }
}
