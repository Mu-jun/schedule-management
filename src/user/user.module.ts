import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { EnvKey } from 'src/cofig/config.validator';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/auth/token/token.service';

@Module({
  controllers: [UserController],
  providers: [UserService,],
  exports: [UserService]
})
export class UserModule { }
