import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FirebaseAdmin } from "../config/firebase.setup";
import { UserModule } from "./user/user.module";
// import { FirestoreModule } from './firestore/firestore.module';
import { LabsModule } from "./labs/labs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    // FirestoreModule.forRoot({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     keyFilename: configService.get<string>('SA_KEY'),
    //   }),
    //   inject: [ConfigService],
    // }),
    UserModule,
    LabsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseAdmin],
})
export class AppModule {}
