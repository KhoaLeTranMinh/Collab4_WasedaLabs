import { PartialType } from '@nestjs/mapped-types';
import { CreateLabDto } from './create-lab.dto';

export class UpdateLabDto extends PartialType(CreateLabDto) {}
