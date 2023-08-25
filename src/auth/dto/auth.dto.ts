import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Column, } from 'typeorm';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty({message: "email is not empty"})
    email: string;

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsString()
    password: string


}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty({message: "email is not empty"})
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string


}