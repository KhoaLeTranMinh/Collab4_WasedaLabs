/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
} from "class-validator";

enum Permissions {
  ADMIN = "ADMIN",
  USER = "USER",
}

import {
  Schools,
  Majors,
  IsValidMajorForSchool,
} from "../validator/customUserValidator";
import { Column, Entity } from "typeorm";
// import { Unique } from 'typeorm';
@Entity()
export class User {
  static collectionName = "users";
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)*waseda\.jp$/, {
    message: "email must have a domain name of @something.waseda.jp",
  })
  @Column({ unique: true })
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, {
    message:
      "password must be from 8 to 20 characters, must contain at least an uppercase, lowercase and a digit",
  })
  password: string;

  @IsNotEmpty()
  @Column()
  firstName: string;

  @IsNotEmpty()
  @Column()
  lastName: string;

  // @IsNotEmpty()
  // @IsEnum(Permissions, { each: false })
  // permissions: Permissions[];

  @IsNotEmpty()
  @IsEnum(Schools, { each: true })
  @Column()
  school: Schools;

  @IsNotEmpty()
  @IsEnum(Majors, { each: true })
  @IsValidMajorForSchool("school", {
    message: "major has to belong to the corresponding school",
  })
  @Column()
  major: Majors;
}
