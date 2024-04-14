import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { FirebaseAdmin } from '../../config/firebase.setup';
import { UserDto } from './dto/user.dto';
import { CollectionReference } from '@google-cloud/firestore';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(private readonly admin: FirebaseAdmin) {}

  async createUser(userRequest: UserDto): Promise<any> {
    const { email, password, firstName, lastName, permissions, school, major } =
      userRequest;
    const app = this.admin.setup();
    const db = getFirestore();
    try {
      const docRef = db
        .collection(UserDto.collectionName)
        .doc(`${firstName} ${lastName}`);
      await docRef.set({
        email,
        password,
        firstName,
        lastName,
        permissions,
        school,
        major,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { permissions });
      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
