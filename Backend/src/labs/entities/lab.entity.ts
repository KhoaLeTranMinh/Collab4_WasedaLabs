import { IsEnum, IsNotEmpty } from 'class-validator';
import {
  IsValidMajorForSchool,
  Majors,
  Schools,
} from 'src/user/dto/customUserValidator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lab {
  @PrimaryGeneratedColumn()
  id: number;
  @IsNotEmpty()
  @Column()
  professorName: string;
  @IsNotEmpty()
  @Column()
  professorTitle: string;
  @IsNotEmpty()
  @Column()
  labWebsite: string;
  @IsNotEmpty()
  researchAreas: string[];

  @IsNotEmpty()
  @IsEnum(Schools)
  @Column()
  school: Schools;

  @IsNotEmpty()
  @Column()
  @IsEnum(Majors)
  @IsValidMajorForSchool('school', {
    message: 'major has to belong to the corresponding school',
  })
  major: Majors;
}
