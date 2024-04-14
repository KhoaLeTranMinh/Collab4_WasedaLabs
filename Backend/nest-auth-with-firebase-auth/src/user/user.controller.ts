import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signup(@Body() userRequest: UserDto) {
    return this.userService.createUser(userRequest);
  }
}
