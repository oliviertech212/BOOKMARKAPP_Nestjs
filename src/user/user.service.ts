import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from "src/Entity/user.entity";
import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { EditDto } from './dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}


  async EditUser(userId:number,dto:EditDto){

    try {
      const result = await this.userRepository.update(userId, { ...dto });
      return result;
    } catch (error) {
      
    }

  }
  


}