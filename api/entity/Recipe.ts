import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column('text')
    description: string;
  
    @Column()
    cookingTime: number; // in minutes
  
    @Column()
    servings: number;
  
    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, { cascade: true })
    ingredients: Ingredient[];

    @Column('text')
    instructions: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
