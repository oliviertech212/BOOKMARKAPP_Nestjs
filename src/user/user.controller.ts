import { Controller, Get, Patch,Body, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

import { UserService } from './user.service';
import { EditDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ApiExtraModels,ApiBody } from '@nestjs/swagger';
import { refs } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard) // use custom jwtGuard
@Controller('users')
export class UserController {
    // // @UseGuards(AuthGuard('jwt'))
    // @UseGuards(AuthGuard)
    // @Get('me')
    // getme(@Req() req: Request){
    //     console.log(req);
        
    //     const user = req.user;
    //     return {user:user}
    // }

    constructor(private userService: UserService){}


   
     @Get('me')
     getme(@GetUser('') user,@GetUser('email') email:string){ //use custom request
         console.log(email);
         
         return {user:user}
     }


     @ApiExtraModels(EditDto)
      @ApiBody({
        schema: {
          oneOf: refs(EditDto),
          example:{
            "email":"oliviertech@yopmail.com",
            "firstName":"oliviertech",
            "lastName":"oliviertech",
          }
        },
      })
     @Patch('update')
     edituser(@GetUser('id') userId:number,@Body() dto:EditDto){
        return this.userService.EditUser(userId,dto)
     }
     

}


