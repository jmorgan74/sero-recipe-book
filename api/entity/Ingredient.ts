import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  quantity: string;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  recipe: Recipe;
}
