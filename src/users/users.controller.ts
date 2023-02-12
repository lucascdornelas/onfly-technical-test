import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('/signin')
  singIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.signIn(loginUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('/validate')
  validate(@Body() accessToken: AccessTokenDto) {
    return this.usersService.validateAccessToken(accessToken.access_token);
  }
}