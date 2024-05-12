/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { LabsService } from "./labs.service";
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";

@Controller("labs")
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Post("upload")
  create(@Res({ passthrough: true }) res) {
    return this.labsService.upload(res);
  }

  @Get("get/:school/:major")
  async find(
    @Param("school") school: string,
    @Param("major") major: string,
  ): Promise<CreateLabDto[]> {
    try {
      const labs = await this.labsService.findOnMajorAndSchool(school, major);
      return labs;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Invalid school or major or major does not belong to school",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.labsService.findOne(+id);
  // }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLabDto: UpdateLabDto) {
    return this.labsService.update(+id, updateLabDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.labsService.remove(+id);
  }
}
