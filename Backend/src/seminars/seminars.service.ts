/* eslint-disable prettier/prettier */
import {
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from "@nestjs/common";
import { CreateSeminarDto } from "./dto/create-seminar.dto";
import { UpdateSeminarDto } from "./dto/update-seminar.dto";
import { FirebaseAdmin } from "config/firebase.setup";
import { getFirestore } from "firebase-admin/firestore";
import { sem_combiner } from "src/utility/seminar_combiner";
import csce_data from "../../scraping/data/labs/FSE/CSCE.json";
import { BadRequestException } from "@nestjs/common";
import { determineSchoolAndMajor } from "../utility/determineSchoolAndMajor";

@Injectable()
export class SeminarsService implements OnApplicationBootstrap {
  seminarCombiner: typeof sem_combiner;
  db: FirebaseFirestore.Firestore;

  constructor(private readonly admin: FirebaseAdmin) {
    this.seminarCombiner = sem_combiner;
  }
  onApplicationBootstrap() {
    this.db = getFirestore();
  }

  async upload(res) {
    const db = this.db;
    db.settings({ ignoreUndefinedProperties: true });
    try {
      this.addData("SILS");
      this.addData("PSE");
      this.addData("SSS");
     
      console.log("Data has been successfully added to the database");
      res
        .status(HttpStatus.OK)
        .send("Data has been successfully added to the database");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addData(school_input: string) {
    const db = this.db;
    const labManager = this.seminarCombiner;
    for (const [key, value] of Object.entries(labManager[`${school_input}`])) {
      const doc_ref = db
      .collection("seminars")
      .doc(`${school_input}`)
      .collection(`${key}`)
      .doc(`${key}`)
      
      // .doc(`${key}`)
      // doc_ref.onSnapshot((snapshot) => {
      //   if (snapshot.exists) {
      //     return;
      //   }
      // });
      const sem = value;
      // const { school, major } = determineSchoolAndMajor(
      //   school_input,
      //   major_input,
      // );
      const seminar_push: CreateSeminarDto = {
        year: sem["Year"],
        courseCode: sem["Course Code"],
        courseTitle: sem["Course Title"],
        instructor: sem["Instructor"],
        school: sem["School"],
        term: sem["Term"],
        dayPeriod: sem["Day, Period"],
        classroom: sem["Classroom"],
        courseDescription: sem["Course Description"],
        comments: sem["comments"],
        language: sem["language"],
        index: sem["index"],
        rating: sem["rating"],
        ratings: sem["ratings"],
      };

      await doc_ref.set(seminar_push);
    }
  }

  // async findOnMajorAndSchool(
  //   school: string,
  //   major: string,
  // ): Promise<CreateLabDto[]> {
  //   const db = this.db;
  //   const major_ref = db
  //     .collection("labs")
  //     .doc(`${school}`)
  //     .collection(`${major}`);
  //   const result = await major_ref.get().then((snapshot) => {
  //     if (snapshot.empty) {
  //       throw new BadRequestException();
  //     }
  //     const labs: CreateLabDto[] = [];
  //     snapshot.forEach((doc) => {
  //       labs.push(doc.data() as CreateLabDto);
  //     });
  //     return labs;
  //   });
  //   return result;
  // }



  // async findOne(
  //   school: string,
  //   major: string,
  //   id: number,
  // ): Promise<CreateLabDto> {
  //   const db = this.db;
  //   const lab_ref = db
  //     .collection("labs")
  //     .doc(`${school}`)
  //     .collection(`${major}`)
  //     .doc(`${id}`);
  //   const result = await lab_ref.get().then((snapshot) => {
  //     if (!snapshot.exists) {
  //       throw new BadRequestException();
  //     } else {
  //       return snapshot.data() as CreateLabDto;
  //     }
  //   });
  //   return result;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} lab`;
  // }

  // async updateCommentAndRating(
  //   school: string,
  //   major: string,
  //   id: number,
  //   updateLabInfo: UpdateLabDto,
  // ) {
  //   const db = this.db;
  //   const { comment, rating } = updateLabInfo;
  //   const lab_ref = db
  //     .collection("labs")
  //     .doc(`${school}`)
  //     .collection(`${major}`)
  //     .doc(`${id}`);
  //   const lab = await this.findOne(school, major, id);
  //   lab.comments.push(comment);
  //   lab.ratings.push(rating);
  //   const averageRating =
  //     lab.ratings.reduce((acc, rating) => {
  //       return acc + rating;
  //     }, 0) / lab.ratings.length;
  //   lab.rating = averageRating;
  //   await lab_ref.set(lab);
  //   return HttpStatus.OK;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lab`;
  // }


