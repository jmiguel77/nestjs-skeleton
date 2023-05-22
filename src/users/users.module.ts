import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { UsersController } from './users.controller';
import { DefaultUsersService, UsersService } from './users.service';
import { DBUsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    DBUsersRepository,
    {
      provide: 'UsersService',
      useFactory: (dbUsersRepository: DBUsersRepository) => {
        const usersService: UsersService = new DefaultUsersService(
          dbUsersRepository,
        );
        return usersService;
      },
      inject: [DBUsersRepository],
    },
  ],
})
export class UsersModule {}
