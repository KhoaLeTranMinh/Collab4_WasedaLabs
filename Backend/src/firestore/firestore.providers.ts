import { UserDto } from 'src/user/dto/user.dto';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [UserDto.collectionName];
