/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import {
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
} from "class-validator";
export enum Schools {
  FSE = "Fundamental Science and Engineering",
  ASE = "Advanced Science and Engineering",
  CSE = "Creative Science and Engineering",
  SILS = "School of International Liberal Studies",
  PSE = "School of Political Science and Economics",
  SSS = "School of Social Sciences",
}
export enum Majors {
  MS = "Mathematical Sciences",
  CSCE = "Computer Science and Communications Engineering",
  PHY = "Physics",
  CHEM = "Chemistry",
  BIOS = "Bioscience",
  ME = "Mechanical Engineering",
  CE = "Civil and Environmental Engineering",
}
@ValidatorConstraint({ async: true })
export class IsValidMajorForSchoolValidator
  implements ValidatorConstraintInterface
{
  validate(major: Majors, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const school = (args.object as any)[relatedPropertyName];
    // console.log(school);

    if (school === Schools.FSE) {
      return [Majors.MS, Majors.CSCE].includes(major);
    }
    if (school === Schools.ASE) {
      return [Majors.PHY, Majors.CHEM, Majors.BIOS].includes(major);
    }
    if (school === Schools.CSE) {
      return [Majors.ME, Majors.CE].includes(major);
    }
  }
  defaultMessage(args) {
    return "Invalid major for the specified school";
  }
}
export function IsValidMajorForSchool(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsValidMajorForSchool",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsValidMajorForSchoolValidator,
    });
  };
}
