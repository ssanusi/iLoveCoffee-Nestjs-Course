import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeeModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATBASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
