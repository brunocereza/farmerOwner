import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  identity_document: string;

  @Column()
  name: string;

  @Column()
  state: string;
}
