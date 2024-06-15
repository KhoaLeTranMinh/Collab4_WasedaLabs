/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { SeminarsService } from "./seminars.service";
import { SeminarsController } from "./seminars.controller";
import { FirebaseAdmin } from "config/firebase.setup";

@Module({
  controllers: [SeminarsController],
  providers: [SeminarsService, FirebaseAdmin],
})
export class SeminarsModule {}
