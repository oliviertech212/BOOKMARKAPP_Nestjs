import { Module } from '@nestjs/common';
import { AppllicationController } from './app.controller';
import { AppllicationService } from './app.service';

@Module({
  controllers: [AppllicationController],
  providers:[AppllicationService]
})
export class AppllicationModule {}
