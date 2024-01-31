import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  city: string;

  @Column()
  identity_document: string;

  @Column()
  name: string;

  @Column()
  state: string;
}
