
import { registerAs } from '@nestjs/config';

// export default registerAs('database', () => ({
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST || 'localhost',
//   port: parseInt(process.env.POSTGRES_PORT, 10) || 35432,
//   username: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: process.env.POSTGRES_DATABASE,
//   entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
//   synchronize: process.env.NODE_ENV === 'development',
//   logging: process.env.NODE_ENV === 'development',
//   migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
//   migrationsTableName: 'migrations',
// }));


import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from '../Entity/user.entity';
import { Bookmark } from '../Entity/bookmark.entity';

config();

const configService = new ConfigService();
const isDevelopment = configService.get('NODE_ENV') === 'development'||'production';

export default registerAs('database', () => ({
    type: configService.get('DB_TYPE'),
    host: isDevelopment ? configService.get('POSTGRES_HOST') : configService.get('POSTGRES_TEST_HOST'),
    port: isDevelopment ? configService.get('POSTGRES_PORT') : configService.get('POSTGRES_TEST_PORT'),
    username: isDevelopment ? configService.get('POSTGRES_USERNAME') : configService.get('POSTGRES_TEST_USERNAME'),
    password: isDevelopment ? configService.get('POSTGRES_PASSWORD') : configService.get('POSTGRES_TEST_PASSWORD'),
    database: isDevelopment ? configService.get('POSTGRES_DATABASE') : configService.get('POSTGRES_TEST_DATABASE'),
    entities: [User,Bookmark],
    synchronize:true,
    logging: isDevelopment,
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
}));

