import { ExtractJwt, Strategy } from 'passport-jwt';

import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy ,'jwt') {
    constructor(config:ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: config.get('SECRET'),
        });
      }
    validate( payload:any){
        return payload.user 
    }
}  