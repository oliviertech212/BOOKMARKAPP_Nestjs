import { Controller, Post, Req,Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

import { AuthDto,LoginDto } from "./dto";

import { ApiBody, ApiBodyOptions,ApiExtraModels } from "@nestjs/swagger";
import { refs } from "@nestjs/swagger";


@Controller('auth')
export class AuthController{

        // authService: AuthService;

    // constructor(authService: AuthService){
    //     this.authService = authService;
    // }
    constructor(private authService: AuthService){}
    @ApiExtraModels(AuthDto)
      @ApiBody({
        schema: {
          oneOf: refs(AuthDto),
          example:{
            "email":"oliviertech@yopmail.com",
            "firstName":"oliviertech",
            "lastName":"oliviertech",
            "password":"123456"
          }
        },
      })
    @Post ('signup')
    signup(@Body() dto: AuthDto ){
        return this.authService.signup(dto);
    }

    
      @ApiExtraModels(LoginDto)
      @ApiBody({
        schema: {
          oneOf: refs(LoginDto),
          example:{
            "email":"oliviertech@yopmail.com",
            "password":"123456"
          }
        },
      })
    @Post ('signin')
    signin(@Body() dto: LoginDto , @Req() req: Request ){
        // append user to request object
        const user = req.user; 
        req.user = user;
        return  this.authService.signin(dto);
    }


}