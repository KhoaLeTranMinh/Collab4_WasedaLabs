/* eslint-disable prettier/prettier */
import { Majors, Schools } from "src/user/dto/customUserValidator";

export function determineSchoolAndMajor(
  school_input: string,
  major_input: string,
) {
  let school;
  let major;
  switch (school_input) {
    case "FSE":
      school = Schools.FSE;
      break;
    case "ASE":
      school = Schools.ASE;
      break;
    case "CSE":
      school = Schools.CSE;
      break;

    default:
      break;
  }
  switch (major_input) {
    case "CSCE":
      major = Majors.CSCE;
      break;
    case "MS":
      major = Majors.MS;
      break;
    case "CE":
      major = Majors.CE;
      break;
    case "ME":
      major = Majors.ME;
      break;
    case "BIOS":
      major = Majors.BIOS;
      break;
    case "CHEM":
      major = Majors.CHEM;
      break;
    case "PHY":
      major = Majors.PHY;
      break;

    default:
      break;
  }
  return { school, major };
}
