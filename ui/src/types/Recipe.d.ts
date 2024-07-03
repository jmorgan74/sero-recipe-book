export interface Ingredient {
    name: string;
    quantity: string;
  }
  
  export interface Recipe {
    title: string;
    description: string;
    cookingTime: number;
    servings: number;
    ingredients: Ingredient[];
    instructions: string;
  }