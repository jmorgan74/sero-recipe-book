import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Recipe } from "../entity/Recipe"
import { Ingredient } from "../entity/Ingredient"

export class RecipeController {

    private recipeRepository = AppDataSource.getRepository(Recipe)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.recipeRepository.find({relations: ["ingredients"]})
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const recipe = await this.recipeRepository.findOne({
            where: { id },
            relations: ["ingredients"]
        })

        if (!recipe) {
            return "Recipe not found"
        }
        return recipe
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, description, cookingTime, servings, ingredients, instructions } = request.body;

        const recipeEntity = Object.assign(new Recipe(), {
            title,
            description,
            cookingTime,
            servings,
            instructions
        });

        const ingredientEntities: Ingredient[] = ingredients.map((ingredient: Ingredient) => {
            const ingredientEntity = new Ingredient();

            ingredientEntity.name = ingredient.name;
            ingredientEntity.quantity = ingredient.quantity;

            return ingredientEntity;
        });

        recipeEntity.ingredients = ingredientEntities;

        return this.recipeRepository.save(recipeEntity);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let recipeToRemove = await this.recipeRepository.findOneBy({ id })

        if (!recipeToRemove) {
            return "This recipe not exist"
        }

        await this.recipeRepository.remove(recipeToRemove)

        return "Recipe has been removed"
    }

}