import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { User } from 'src/Entity/user.entity';
import { Bookmark } from 'src/Entity/bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService]
})
export class BookmarkModule {}
