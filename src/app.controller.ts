import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { CheckChemicalsDto } from './dto/checkChemicalsDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/quimic')
  checkChemicals(@Body() body: CheckChemicalsDto): JSON {
    return this.appService.checkChemicals(body);
  }
}
