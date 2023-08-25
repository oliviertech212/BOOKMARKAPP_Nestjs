

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Bookmark } from 'src/Entity/bookmark.entity';
import { BookmarkDto, EditBookmarkDto } from './dto';


import { BookmarkService } from './bookmark.service';
import { ApiBearerAuth } from '@nestjs/swagger';


@UseGuards(JwtGuard)
@Controller({path:'bookmarks',version:'2'})
export class BookmarkControllerv2 {

   constructor(private bookmarkService: BookmarkService){}

    @Post('/create')
    createBookmark(@GetUser('id') userId:number,@Body() dto:BookmarkDto){
        return this.bookmarkService.createBookmark(userId,dto)+"v2";

    }

    @Get()
    getBookmarks(@GetUser('id') userId:number,dto:BookmarkDto){
        return this.bookmarkService.getBookmarks(userId)

    }
   
    @Get(':id')
    getBookmarkById(@GetUser('id') userId:number,
    @Param('id', ParseIntPipe) bookmarkId:number,
    dto:BookmarkDto){

        return this.bookmarkService.getBookmarkById(userId, bookmarkId)

    }
    
    @Patch('update/:id')
    updateBookmarkById(@GetUser('id') userId:number,
    @Param('id', ParseIntPipe) bookmarkId:number
    ,@Body() dto:EditBookmarkDto){

        return this.bookmarkService.updateBookmarkById(userId,bookmarkId,dto)

    }

    @Delete('delete/:id')
    deleteBookmarkById(@GetUser('id') userId:number,
    @Param('id', ParseIntPipe) bookmarkId:number,
    ){
        return this.bookmarkService.deleteBookmarkById(userId,bookmarkId)

    }



}
