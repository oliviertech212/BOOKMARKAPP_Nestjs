import { Bookmark } from "src/Entity/bookmark.entity";




import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';


export class BookmarkDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    description: string
    
    @IsNotEmpty()
    @IsString()
    link: string



}

export class EditBookmarkDto {
    @IsOptional()
    @IsString()
    title: string;
    
    @IsOptional()
    @IsString()
    description: string
    
    @IsOptional()
    @IsString()
    link: string



}