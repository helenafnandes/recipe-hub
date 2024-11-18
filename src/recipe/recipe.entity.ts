import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array') // comma-separated array
  ingredients: string[];

  @Column()
  preparationMethod: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  numberOfRatings: number;
}
