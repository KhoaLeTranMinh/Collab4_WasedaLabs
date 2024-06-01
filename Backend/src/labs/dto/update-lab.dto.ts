import { PartialType } from "@nestjs/mapped-types";
import { CreateLabDto } from "./create-lab.dto";
import { IsNumber, Max, Min } from "class-validator";

export class UpdateLabDto extends PartialType(CreateLabDto) {
  comment: string;
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
