import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AppConfig,DatabaseConfig } from './configdb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppllicationModule } from './Appllication/app.module';


// entities
import { User } from './Entity/user.entity';
import { Bookmark } from './Entity/bookmark.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // type: 'postgres',
        // host: configService.get('POSTGRES_HOST'),
        // // port: configService.get('POSTGRES_PORT'),
        // username: configService.get('POSTGRES_USERNAME'),
        // password: configService.get('POSTGRES_PASSWORD'),
        // database: configService.get('POSTGRES_DATABASE'),
        // entities: [User,Bookmark],
        // synchronize:true  
        ...configService.get('database'),

   
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    AppllicationModule


   
   ],

})
export class AppModule {}
