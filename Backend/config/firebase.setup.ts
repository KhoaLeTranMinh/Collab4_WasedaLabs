/* eslint-disable prettier/prettier */
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as admin from "firebase-admin";
import { FirebaseApp, initializeApp } from "firebase/app";
import "./firebaseServiceAccountKey.json";
import firebase from "firebase/compat/app";
let appAdmin: admin.app.App = null;
let app: FirebaseApp = null;
@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!appAdmin && !app) {
      const firebaseConfig = {
        apiKey: "AIzaSyD2Kf9tbo8_AjnW2X9yto0XU2K8F81md-w",
        authDomain: "waseda-labs-collab4.firebaseapp.com",
        projectId: "waseda-labs-collab4",
        storageBucket: "waseda-labs-collab4.appspot.com",
        messagingSenderId: "1008635581169",
        appId: "1:1008635581169:web:681330ca0210030af90f50",
        measurementId: "G-3VF6E3PJQ6",
      };

      app = initializeApp(firebaseConfig);
      // Initialize Firebase
      const firebaseServiceAccountFileConfig = await readFile(
        "./config/firebaseServiceAccountKey.json",
        "utf8",
      );
      const serviceAccount = await JSON.parse(firebaseServiceAccountFileConfig);
      appAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }
  setupAdmin() {
    return appAdmin;
  }

  setup() {
    return app;
  }
}
