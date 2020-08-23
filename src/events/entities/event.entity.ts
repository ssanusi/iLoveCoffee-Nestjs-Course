import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm/index';

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>

}
