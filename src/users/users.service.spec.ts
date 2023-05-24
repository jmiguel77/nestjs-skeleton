import { UsersRepository } from './users.repository';
import { DefaultUsersService, UsersService } from './users.service';
import { User } from './user.model';
import { UserEntity } from './users.entity';

describe('UsersService', () => {
  let usersRepository: UsersRepository;
  let usersService: UsersService;

  beforeEach(() => {
    usersRepository = {
      getAll: jest.fn(),
      create: jest.fn(),
    };
    usersService = new DefaultUsersService(usersRepository);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(usersRepository, 'getAll').mockImplementation(() => {
        return new Promise((resolve) => {
          const users = new Array<UserEntity>();
          users.push({ id: 1, name: 'John Doe', email: 'jd@mail.com' });
          resolve(users);
        });
      });

      expect((await usersService.getAll()).length).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(usersRepository, 'create').mockImplementation(() => {
        return new Promise<any>((resolve) => {
          resolve({
            id: 1,
          });
        });
      });

      const user: User = { id: null, name: 'John Doe', email: 'jd@mail.com' };

      expect(await usersService.create(user)).not.toBeNull();
    });
  });
});
