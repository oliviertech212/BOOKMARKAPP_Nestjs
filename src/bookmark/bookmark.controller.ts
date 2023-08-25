

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Bookmark } from 'src/Entity/bookmark.entity';
import { BookmarkDto, EditBookmarkDto } from './dto';


import { BookmarkService } from './bookmark.service';
import { ApiBearerAuth, ApiBody,ApiExtraModels,refs} from '@nestjs/swagger';



@ApiBearerAuth()

@UseGuards(JwtGuard)
@Controller({path:'bookmarks'})
export class BookmarkController {

   constructor(private bookmarkService: BookmarkService){}

   @ApiExtraModels(BookmarkDto)
   @ApiBody({
     schema: {
       oneOf: refs(BookmarkDto),
       example:{
         "title":"best website ever",
         "description":"i'm testing Apiendpoints",
         "link":"https://github.com/oliviertech212?tab=projects"
        }
     },
 })
   @Version('1')
    @Post('/create')
    createBookmark(@GetUser('id') userId:number,@Body() dto:BookmarkDto){
        return this.bookmarkService.createBookmark(userId,dto)

    }




    @ApiExtraModels(BookmarkDto)
    @ApiBody({
      schema: {
        oneOf: refs(BookmarkDto),
        example:{
          "title":"best website ever",
          "description":"i'm testing Apiendpoints",
          "link":"https://github.com/oliviertech212?tab=projects"
         }
      },
  })
    @Version('2')
    @Post('/create')
    createBookmarkv2(@GetUser('id') userId:number,@Body() dto:BookmarkDto){
        return this.bookmarkService.createBookmark(userId,dto)

    }
    

    @Version(VERSION_NEUTRAL)
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
    


    @ApiExtraModels(EditBookmarkDto)
    @ApiBody({
      schema: {
        oneOf: refs(EditBookmarkDto),
        example:{
          "title":"best website ever",
          "description":"i'm testing Apiendpoints",
          "link":"https://github.com/oliviertech212?tab=projects"
         }
      },
    })
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
