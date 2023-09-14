import { Controller, Get } from '@nestjs/common';
import { AppllicationService } from './app.service';

@Controller()
export class AppllicationController {
    constructor(public appService: AppllicationService){}
    @Get()
    getApp(){
        return this.appService.display();
    }
}
