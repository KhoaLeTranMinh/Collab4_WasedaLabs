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
import { PartialType } from "@nestjs/mapped-types";
import { User } from "../entities/user";
export class UserDto extends PartialType(User) {}
