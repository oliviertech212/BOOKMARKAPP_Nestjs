import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../Entity/user.entity";

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constaints';
import { JwtStrategy } from "./startegy";

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({})
    //  JwtModule.register({
    //     global: true,
    //     secret: jwtConstants.secret,
    //     signOptions: { expiresIn: '1h' },
    //   }),
    ],
    providers: [AuthService,JwtStrategy],
    controllers:[AuthController]

})

export class AuthModule{}