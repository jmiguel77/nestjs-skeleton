import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersService
        .create(user)
        .then(() => resolve(null))
        .catch((err) => reject(err));
    });
  }

  @Get()
  getAll(): Promise<Array<User>> {
    return this.usersService.getAll();
  }
}
