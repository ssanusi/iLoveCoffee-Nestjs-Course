/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Param, Body, Put, Patch, Delete } from '@nestjs/common';

@Controller('coffees')
export class CoffeeController {
  @Get()
  findAll(): string {
    return `These are All the coffees available`;
  }

  @Get(':id')
  findOne(@Param() params): string {
    return `These is the coffees #${params.id} requested`;
  }

  @Post()
  create(@Body() body: string): string {
    return `You want to create this #${body} please hold on`;
  }

  @Put(':id')
  updateFull(@Param() params, @Body() body: string): string {
    return `We will try to update the coffee #${params.id} with the data ${body}`;
  }

  @Patch(':id')
  updatePatial(@Param() params, @Body() body: string): string {
    return `We will try to update the coffee #${params.id} with the data ${body}`;
  }

  @Delete(':id')
  remove(@Param() params): string {
    return `Coffee with id #${params.id} is been deleted`;
  }
}
