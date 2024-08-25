import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() payload: UserDto) {
    return this.userService.create(payload);
  }
}
