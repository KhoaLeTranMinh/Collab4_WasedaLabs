import { IsNotEmpty, IsEnum } from "class-validator";
import {
  Schools,
} from "src/user/validator/customUserValidator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateSeminarDto {
    @IsNotEmpty()
    index: number;
    @IsNotEmpty()
    year: string;
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
    ratings: number[];
    @IsNotEmpty()
    rating: number;
    @IsNotEmpty()
    comments: string[];

    @IsNotEmpty()
    @IsEnum(Schools)
    school: Schools;
    }
