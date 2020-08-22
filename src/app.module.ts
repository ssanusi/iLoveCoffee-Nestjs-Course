import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { CoffeeController } from './coffee/coffee.controller';

@Module({
  imports: [CoffeeModule],
  controllers: [AppController, CoffeeController],
  providers: [AppService],
})
export class AppModule {}
