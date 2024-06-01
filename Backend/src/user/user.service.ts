/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from "@nestjs/common";
import { FirebaseAdmin } from "../../config/firebase.setup";
import { UserDto } from "./dto/user.dto";
// import { CollectionReference } from '@google-cloud/firestore';
import { getFirestore } from "firebase-admin/firestore";
import { log } from "console";
import { AuthError } from "@firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { app } from "firebase-admin";
import { User } from "./entities/user";
import { on } from "events";
import { LoginRequest } from "./user.controller";
import { FirebaseApp } from "firebase/app";
@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  db: FirebaseFirestore.Firestore;
  app: FirebaseApp;
  constructor(private readonly admin: FirebaseAdmin) {
    this.app = this.admin.setup();
  }

  async login(request: LoginRequest): Promise<any> {
    const app = this.admin.setup();
    const auth = getAuth(app);
    const { email, password } = request;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        throw new BadRequestException("Please verify your email first");
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createUser(userRequest: User): Promise<any> {
    const { email, password, firstName, lastName, school, major } = userRequest;

    const appAdmin = this.admin.setupAdmin();
    const app = this.admin.setup();
    const db = getFirestore();
    const auth = getAuth(app);
    const userDB = {
      email,
      password,
      firstName,
      lastName,
      school,
      major,
    };
    try {
      const docRef = db
        .collection(User.collectionName)
        .doc(`${firstName} ${lastName}`);
      await docRef.set(userDB);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    try {
      // const createdUser = await appAdmin.auth().createUser({
      //   email,
      //   password,
      //   displayName: `${firstName} ${lastName}`,
      // });
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:8080/",
        // This must be true.
        handleCodeInApp: true,
      };

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await sendEmailVerification(user, actionCodeSettings);
      // alert(`email verfication has been sent to ${user.email}`);

      // return createdUser;
      return userDB;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signOut(): Promise<void> {
    const auth = getAuth();
    await auth
      .signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }

  async getCurrentUser(): Promise<User> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new BadRequestException("User is not signed in");
    }
    const user_email = user.email;
    const db = getFirestore();
    const userRef = db.collection("users");
    const userSnapshot = await userRef.where("email", "==", user_email).get();
    let returnUser;
    userSnapshot.forEach((doc) => {
      returnUser = doc.data();
    });
    return returnUser;
  }
}
