import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array') // separado por vírgula
  ingredients: string[];

  @Column()
  preparationMethod: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: 0 })
  numberOfRatings: number;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'int', default: 0 }) // Ex.: 0 = "Outras", 1 = "Sobremesa", etc.
  category: number;

  @ManyToOne(() => User, (user) => user.recipes)
  createdBy: User;

  @DeleteDateColumn() // soft-delete timestamp
  deletedAt?: Date;
}
