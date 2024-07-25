import { PartialType } from '@nestjs/mapped-types';
import { CreateSeminarDto } from './create-seminar.dto';
import { IsNumber, Max, Min } from "class-validator";


export class UpdateSeminarDto extends PartialType(CreateSeminarDto) {
    comment: string;
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
}
