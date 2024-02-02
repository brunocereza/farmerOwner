import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Farm } from '../farm/farm-entity';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  identity_document: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => Farm, (Farm) => Farm.owner)
  farms: Farm[];
}
