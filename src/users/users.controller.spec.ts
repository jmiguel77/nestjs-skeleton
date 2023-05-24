import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = {
      getAll: jest.fn(),
      create: jest.fn(),
    };
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(usersService, 'getAll').mockImplementation(() => {
        return new Promise((resolve) => {
          const users = new Array<User>();
          users.push({ id: 1, name: 'John Doe', email: 'jd@mail.com' });
          resolve(users);
        });
      });

      expect(await usersController.getAll()).not.toBeNull();
      expect((await usersController.getAll()).length).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() => {
        return new Promise<any>((resolve) => {
          resolve({
            id: 1,
          });
        });
      });

      const user: User = { id: null, name: 'John Doe', email: 'jd@mail.com' };

      expect(await usersController.create(user)).toBeNull();
    });
  });
});
