import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkControllerv2 } from './bookmark.controller.v2';
import { BookmarkService } from './bookmark.service';
import { User } from '../Entity/user.entity';
import { Bookmark } from '../Entity/bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,Bookmark])],
  // controllers: [BookmarkController,BookmarkControllerv2],
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule {}
