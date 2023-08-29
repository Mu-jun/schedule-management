import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from './../src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMTestConfig } from './../src/cofig/typeorm.config';
import { Repository } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideModule(TypeOrmModule).useModule(
      TypeOrmModule.forRootAsync({
        useClass: typeORMTestConfig,
      })
    ).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    userRepository = moduleFixture.get('UserRepository');

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  /* 
   * 유저 생성
   */
  describe('/user (POST)', () => {
    const craeteTestUser = (num: number) => {
      const user = new User();
      user.user_id = `test${num}@example.com`;
      user.name = `test${num}`;
      user.password = `test${num}pw`;
      return user;
    }
    const user1 = craeteTestUser(1);

    it('HttpStatus CREATED 201', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send(user1)
        .expect(HttpStatus.CREATED);
    });

    it('HttpStatus CONFLICT 409', async () => {
      // give
      await userRepository.save(user1);

      // when
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(user1);

      //then
      expect(response.status).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('이메일이 이미 존재합니다.');
    });
  })
});
