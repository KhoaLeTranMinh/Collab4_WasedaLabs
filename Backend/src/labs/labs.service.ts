/* eslint-disable prettier/prettier */
import {
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from "@nestjs/common";
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";
import { FirebaseAdmin } from "config/firebase.setup";
import { getFirestore } from "firebase-admin/firestore";
import { lab_combiner } from "src/utility/lab_combiner";
import csce_data from "../../scraping/data/labs/FSE/CSCE.json";
import { BadRequestException } from "@nestjs/common";
import { determineSchoolAndMajor } from "../utility/determineSchoolAndMajor";

@Injectable()
export class LabsService implements OnApplicationBootstrap {
  labCombiner: typeof lab_combiner;
  db: FirebaseFirestore.Firestore;

  constructor(private readonly admin: FirebaseAdmin) {
    this.labCombiner = lab_combiner;
  }
  onApplicationBootstrap() {
    this.db = getFirestore();
  }

  async upload(res) {
    const db = this.db;
    db.settings({ ignoreUndefinedProperties: true });
    try {
      this.addData("FSE", "MS");
      this.addData("FSE", "CSCE");
      this.addData("ASE", "BIOS");
      this.addData("ASE", "CHEM");
      this.addData("ASE", "PHY");
      this.addData("CSE", "CE");
      this.addData("CSE", "ME");
      console.log("Data has been successfully added to the database");
      res
        .status(HttpStatus.OK)
        .send("Data has been successfully added to the database");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addData(school_input: string, major_input: string) {
    const db = this.db;
    const labManager = this.labCombiner;
    for (const [key, value] of Object.entries(labManager[`${major_input}`])) {
      const doc_ref = db
        .collection("labs")
        .doc(`${school_input}`)
        .collection(`${major_input}`)
        .doc(`${key}`);
      // doc_ref.onSnapshot((snapshot) => {
      //   if (snapshot.exists) {
      //     return;
      //   }
      // });
      const lab = value;
      const { school, major } = determineSchoolAndMajor(
        school_input,
        major_input,
      );
      const lab_push: CreateLabDto = {
        profName: lab["profName"],
        profPosition: lab["profPosition"],
        profImg: lab["profImg"],
        labWebsite: lab["labWebsite"],
        researchAreas: lab["researchAreas"],
        school: school,
        major: major,
      };

      await doc_ref.set(lab_push);
    }
  }

  async findOnMajorAndSchool(
    school: string,
    major: string,
  ): Promise<CreateLabDto[]> {
    const db = this.db;
    const major_ref = db
      .collection("labs")
      .doc(`${school}`)
      .collection(`${major}`);
    const result = await major_ref.get().then((snapshot) => {
      if (snapshot.empty) {
        throw new BadRequestException();
      }
      const labs: CreateLabDto[] = [];
      snapshot.forEach((doc) => {
        labs.push(doc.data() as CreateLabDto);
      });
      return labs;
    });
    return result;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} lab`;
  // }

  update(id: number, updateLabDto: UpdateLabDto) {
    return `This action updates a #${id} lab`;
  }

  remove(id: number) {
    return `This action removes a #${id} lab`;
  }
}
