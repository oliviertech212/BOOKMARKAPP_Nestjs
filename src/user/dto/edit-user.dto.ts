

import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';


export class EditDto {
    @IsEmail()
    @IsOptional()
    email: string;
    
    @IsOptional()
    @IsString()
    firstName: string
    
    @IsOptional()
    @IsString()
    lastName: string
    
    @IsOptional()
    @IsString()
    password: string


}