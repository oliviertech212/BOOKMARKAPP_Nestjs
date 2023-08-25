

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BookmarkDto, EditBookmarkDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { Bookmark } from 'src/Entity/bookmark.entity';


@Injectable()
export class BookmarkService {

    constructor(
        @InjectRepository(Bookmark) private readonly bookMarkRepository: Repository<Bookmark>,
      ) {}
    
   

    async createBookmark(userId:number, dto:BookmarkDto){

        try {
          const bookmark= await this.bookMarkRepository.create({
            title:dto.title,description:dto.description,link:dto.link,user:userId
          })
          const  result= await this.bookMarkRepository.save(bookmark)
          // return saved bookmarks
          return {result};
            
        } catch (error) {

          console.log(error.message);
          
            
        }

    }

  
   async getBookmarks( userId:number){   
    try {
        const result = await this.bookMarkRepository.find({where:{user:userId}});
        console.log("bookmark",result);
        
        return result;
      } catch (error) {
        
      }

    }
   
    
   async getBookmarkById(userId:number , bookmarkId:number){
      try {
        const result = await this.bookMarkRepository.findOne({where:{user:userId,id:bookmarkId}});
        
        return result;
      } catch (error) {

        console.log(error.message);
        
        
      }

    }

   
  
   async updateBookmarkById(userId:number ,bookmarkId:number, dto:EditBookmarkDto){
       try {
        const result = await this.bookMarkRepository.createQueryBuilder()
        .update(Bookmark)
        .set({...dto })
        .where({user:userId,id:bookmarkId })
        .execute()

        console.log("updated bookmark",result);
        
        
        return result;
      } catch (error) {

        console.log(error.message);
        
        
      }

    }

   async deleteBookmarkById( userId:number ,bookmarkId:number){

     try {
        const result = await this.bookMarkRepository.delete({user:userId,id:bookmarkId});
        console.log("deleted bookmark",result);
        
        return result;
      } catch (error) {

        console.log(error.message);
        
        
      }


    }
}
