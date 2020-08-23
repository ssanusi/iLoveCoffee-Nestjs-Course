import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Coffee } from './coffee.entities';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

    @ManyToMany(type => Coffee, coffee => coffee.flavors)
  coffees:Coffee[]
}
