import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch, Query,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entities';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Coffee> {
    return this.coffeeService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCofeeDto: UpdateCoffeeDto): Promise<Coffee> {
    return this.coffeeService.update(id, updateCofeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Coffee> {
    return this.coffeeService.remove(id);
  }
}
