import { Injectable } from '@nestjs/common';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';

@Injectable()
export class SeminarsService {
  create(createSeminarDto: CreateSeminarDto) {
    return 'This action adds a new seminar';
  }

  findAll() {
    return `This action returns all seminars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seminar`;
  }

  update(id: number, updateSeminarDto: UpdateSeminarDto) {
    return `This action updates a #${id} seminar`;
  }

  remove(id: number) {
    return `This action removes a #${id} seminar`;
  }
}
