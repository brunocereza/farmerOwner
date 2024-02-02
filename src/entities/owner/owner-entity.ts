import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Farm } from '../farm/farm-entity';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  identity_document: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => Farm, (Farm) => Farm.owner)
  farms: Farm[];
}
