import { IsEnum, IsNotEmpty } from "class-validator";
import {
  IsValidMajorForSchool,
  Majors,
  Schools,
} from "src/user/validator/customUserValidator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Seminar {
    @PrimaryGeneratedColumn()
    id: number;
    @IsNotEmpty()
    @Column()
    year: string;
    @IsNotEmpty()
    @Column()
    professorTitle: string;
    @IsNotEmpty()
    @Column()
    labWebsite: string;
    @IsNotEmpty()
    researchAreas: string[];
    @IsNotEmpty()
    courseCode: string;
    @IsNotEmpty()
    courseTitle: string;
    @IsNotEmpty()
    instructor: string;
    @IsNotEmpty()
    term: string[];
    @IsNotEmpty()
    dayPeriod: string[];
    @IsNotEmpty()
    classroom: string[];
    @IsNotEmpty()
    courseDescription: string[];
    @IsNotEmpty()
    language: string[];

  @IsNotEmpty()
  @IsEnum(Schools)
  @Column()
  school: Schools;
}
