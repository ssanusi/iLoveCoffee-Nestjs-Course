/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Param, Body, Put, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeeController {
  @Get()
  findAll(): string {
    return `These are All the coffees available`;
  }

  @Get(':id')
  findOne(@Param('id') id: string ): string {
    return `These is the coffees #${id} requested`;
  }

  @Post()
  create(@Body() body: string): string {
    return `You want to create this #${body} please hold on`;
  }

  @Put(':id')
  updateFull(@Param('id') id, @Body() body: string): string {
    return `We will try to update the coffee #${id} with the data ${body}`;
  }

  @Patch(':id')
  updatePatial(@Param('id') id: string, @Body() body: string): string {
    return `We will try to update the coffee #${id} with the data ${body}`;
  }

  @Delete(':id')
  remove(@Param('id') id): string {
    return `Coffee with id #${id} is been deleted`;
  }
}
