import { Controller, Post, Req,Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

import { AuthDto,LoginDto } from "./dto";


@Controller('auth')
export class AuthController{

        // authService: AuthService;

    // constructor(authService: AuthService){
    //     this.authService = authService;
    // }
    constructor(private authService: AuthService){}
    @Post ('signup')
    signup(@Body() dto: AuthDto ){
        return this.authService.signup(dto);
    }


    @Post ('signin')
    signin(@Body() dto: LoginDto , @Req() req: Request ){
        // append user to request object
        const user = req.user; 
        req.user = user;
        return  this.authService.signin(dto);
    }


}