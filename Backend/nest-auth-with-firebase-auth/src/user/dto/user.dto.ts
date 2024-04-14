import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from 'class-validator';

enum Permissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
}

import { Schools, Majors, IsValidMajorForSchool } from './customUserValidator';

export class UserDto {
  static collectionName = 'users';
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
    message: 'password too weak',
  })
  password: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(Permissions, { each: true })
  permissions: Permissions[];

  @IsNotEmpty()
  @IsEnum(Schools, { each: true })
  school: Schools;

  @IsNotEmpty()
  @IsEnum(Majors, { each: true })
  @IsValidMajorForSchool('school', {
    message: 'major has to belong to the corresponding school',
  })
  major: Majors;
}
