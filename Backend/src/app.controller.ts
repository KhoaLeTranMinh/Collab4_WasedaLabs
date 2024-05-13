import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/morning')
  @Auth('ADMIN')
  goodMorning() {
    return 'Good Morning!';
  }

  @Get('/afternoon')
  @Auth('DEVELOPER')
  goodAfternoon() {
    return 'Good Afternoon!';
  }

  @Get('/evening')
  goodEvening() {
    return 'Good Evening!';
  }
}
