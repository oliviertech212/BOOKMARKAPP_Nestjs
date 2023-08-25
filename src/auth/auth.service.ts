import { Injectable } from "@nestjs/common";
import { AuthDto,LoginDto } from "./dto";

import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService{

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        private config: ConfigService,
      ) {}
      
      
    async signup(dto:AuthDto){
     
         try {
               // generate new password
         const hash =await argon.hash(dto.password);

             // save new user
         const newUser = this.userRepository.create({
            email: dto.email,firstName: dto.firstName,lastName: dto.lastName,password: hash
         });

           const  user=this.userRepository.save(newUser)
           
            // return saved user
            return {user};

         } catch (error) {
        
    if (error.code === "23505") {
        console.log("Email already exists.");
        return { error: "Email already exists." };
      } else {
        return { error: "An error occurred while signing up." };
      }
            
            
         }
         
       
    }

    async signin(dto:LoginDto){
      
        try {
            const hash =await argon.hash(dto.password);
        const user = await this.userRepository.findOne({where:{email:dto.email}});
        // const userPassword = await this.userRepository.findOne({where:{password:dto.password}});
        const passwordMatches=await argon.verify(user.password,dto.password);

        if(!user){
            return "Invalid username"
        }

        if(!passwordMatches){
            return "Invalid password"
        }
        delete user.password
        // return {user}
        const payload = { sub: user.id, user: user };

        const secret = this.config.get('secret');
        return {
          access_token: await this.jwtService.signAsync(payload,{ expiresIn: '1h',secret: secret}),
        };
            
        } catch (error) {
            
        }
        
    }
}