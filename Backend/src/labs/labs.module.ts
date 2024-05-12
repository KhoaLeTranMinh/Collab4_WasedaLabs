/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { LabsService } from "./labs.service";
import { LabsController } from "./labs.controller";
import { FirebaseAdmin } from "config/firebase.setup";

@Module({
  controllers: [LabsController],
  providers: [LabsService, FirebaseAdmin],
})
export class LabsModule {}
