/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoffeeService {
    constructor(
        @InjectRepository(Coffee)
        private readonly cofeeRepository: Repository<Coffee>) { }

  findAll(): Promise<Coffee[]> {
    return this.cofeeRepository.find();
  }

  async findOne(id: string) {
    const coffee = await this.cofeeRepository.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Cofee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto){
    const coffee = this.cofeeRepository.create(createCoffeeDto);
    return this.cofeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
    const coffee = await this.cofeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
    });

    if (!coffee) {
      throw new NotFoundException();
    }
    return this.cofeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.cofeeRepository.remove(coffee);
  }
}
