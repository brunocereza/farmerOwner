import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../owner/owner-entity';

@Entity('farm')
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  arable_area: number;

  @Column()
  total_area: number;

  @Column('text', { array: true })
  crops_types: string[];

  @Column()
  vegetation_area: number;

  @Column('uuid')
  ownerId: string;

  @ManyToOne(() => Owner, (Owner) => Owner.farms)
  owner: Owner;
}
