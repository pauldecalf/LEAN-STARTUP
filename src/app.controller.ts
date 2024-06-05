import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHome() {
    return this.appService.getHome();
  }
  @Get('/about')
  @Render('about')
  getAbout() {
    return { message: this.appService.getAboutMessage() };
  }
}
