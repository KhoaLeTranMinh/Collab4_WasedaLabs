import { PartialType } from '@nestjs/mapped-types';
import { CreateSeminarDto } from './create-seminar.dto';

export class UpdateSeminarDto extends PartialType(CreateSeminarDto) {}
