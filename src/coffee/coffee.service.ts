/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly cofeeRepository: Repository<Coffee>,
    @InjectRepository(Coffee)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto): Promise<Coffee[]> {
    const { offset, limit } = paginationQuery;
    return this.cofeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string) {
    const coffee = await this.cofeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException(`Cofee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );
    const coffee = this.cofeeRepository.create({ ...createCoffeeDto, flavors });
    return this.cofeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = await this.cofeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ name });
    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({ name });
  }
}
