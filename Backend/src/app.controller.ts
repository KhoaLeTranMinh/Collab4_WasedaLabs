/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Auth } from "./decorators/auth.decorator";
import { FirebaseAdmin } from "config/firebase.setup";
import firebase from "firebase/compat";
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private firebase: FirebaseAdmin,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/morning")
  goodMorning() {
    return "Good Morning!";
  }

  @Get("/afternoon")
  @Auth("DEVELOPER")
  goodAfternoon() {
    return "Good Afternoon!";
  }

  @Get("/evening")
  goodEvening() {
    return "Good Evening!";
  }
}
