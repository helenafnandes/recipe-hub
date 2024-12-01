import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.createdBy)
  recipes: Recipe[];
}
