import { IsNotEmpty, IsEnum } from "class-validator";
import {
  Schools,
  Majors,
  IsValidMajorForSchool,
} from "src/user/validator/customUserValidator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateLabDto {
  @IsNotEmpty()
  index: number;
  @IsNotEmpty()
  profName: string;
  @IsNotEmpty()
  profImg: string;
  @IsNotEmpty()
  profPosition: string;
  @IsNotEmpty()
  labWebsite: string;
  @IsNotEmpty()
  researchAreas: string[];

  @IsNotEmpty()
  @IsEnum(Schools)
  school: Schools;

  @IsNotEmpty()
  @IsEnum(Majors)
  @IsValidMajorForSchool("school", {
    message: "major has to belong to the corresponding school",
  })
  major: Majors;
  @IsNotEmpty()
  ratings: number[];
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  comments: string[];
}
