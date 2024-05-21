import { UserDto } from "src/user/dto/user.dto";
import { User } from "src/user/entities/user";

export const FirestoreDatabaseProvider = "firestoredb";
export const FirestoreOptionsProvider = "firestoreOptions";
export const FirestoreCollectionProviders: string[] = [User.collectionName];
