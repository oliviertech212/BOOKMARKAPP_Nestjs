

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get('POSTGRES_HOST' ),
    port: configService.get('POSTGRES_PORT') || 35432,
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
    synchronize: configService.get('NODE_ENV')=== 'development',
    logging: configService.get('NODE_ENV')=== 'development',
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
});



  