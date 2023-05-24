import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../src/users/users.entity';
import { User } from '../src/users/user.model';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [UserEntity],
          synchronize: true,
          logging: false,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  it(`/POST users`, () => {
    const user: User = { id: null, name: 'John Doe', email: 'jd@mail.com' };
    return request(app.getHttpServer()).post('/users').send(user).expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
