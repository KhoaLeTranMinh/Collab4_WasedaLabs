/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user";

export type LoginRequest = {
  email: string;
  password: string;
};
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  signup(@Body() userRequest: User) {
    return this.userService.createUser(userRequest);
  }
  @Post("/login")
  login(@Body() request: LoginRequest) {
    return this.userService.login(request);
  }
  @Get("currentuser")
  getUser() {
    return this.userService.getCurrentUser();
  }

  @Post("logout")
  logOut() {
    return this.userService.signOut();
  }
}
