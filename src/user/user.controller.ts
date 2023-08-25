import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from '../auth/dto/signin-user.dto';
import { ApiConflictResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiConflictResponse()
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }
}
