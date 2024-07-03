import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/Recipe";

export class Seeder {

    private recipeRepository: any;
    private ingredientRepository: any;

    constructor(recipeRepository: any, ingredientRepository: any) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    async createRecipeSeedData() {
        const ingredients1 = [
            { quantity: "3", name: "peeled garlic cloves" },
            { quantity: "300ml", name: "buttermilk" },
            { quantity: "10g", name: "parsley" },
            { quantity: "1tbsp", name: "rosemary" },
            { quantity: "1tbsp", name: "brown sugar" },
            { quantity: "1tsp", name: "sea salt" },
            { quantity: "1tsp", name: "black pepper" },
            { quantity: "4", name: "chicken thighs" },
            { quantity: "4", name: "chicken drumsticks" },
        ];

        const ingredients2 = [
            { quantity: "2", name: "pork sausages" },
            { quantity: "3", name: "spring onions" },
            { quantity: "2cm/¾in piece", name: "grated root ginger" },
            { quantity: "handful", name: "fresh conriander" },
            { quantity: "4tsp", name: "dark doy sauce" },
            { quantity: "2", name: "small garlic cloves, finely chopped" },
            { quantity: "2pinches", name: "dried chilli flakes" },
            { quantity: "1tsp", name: "sesame oil" },
            { quantity: "2tsp", name: "vegatable oil" },
            { quantity: "1", name: "carrot" },
            { quantity: "1 nest", name: "dried egg noodles" },
            { quantity: "handful", name: "beansprouts" }
        ];

        const ingredient1Entities = ingredients1.map(ingredient => {
            const ingredientEntity = new Ingredient();
            ingredientEntity.name = ingredient.name;
            ingredientEntity.quantity = ingredient.quantity;
            return ingredientEntity;
        });

        const ingredient2Entities = ingredients2.map(ingredient => {
            const ingredientEntity = new Ingredient();
            ingredientEntity.name = ingredient.name;
            ingredientEntity.quantity = ingredient.quantity;
            return ingredientEntity;
        });

        await this.ingredientRepository.save(ingredient1Entities);
        await this.ingredientRepository.save(ingredient2Entities);
      
        const recipe1 = new Recipe();
        recipe1.title = "Buttermilk chicken";
        recipe1.description = "Garlic and herbs add flavour to this simple buttermilk chicken; marinate for several hours, or overnight, then bung it in the oven or on the barbecue. Serve with salad and chips, or boiled or baked potatoes. Each serving provides 263 kcal, 35g protein, 7g carbohydrates (of which 7g sugars), 10.5g fat (of which 3g saturates), 0g fibre and 1.7g salt.";
        recipe1.cookingTime = 60;
        recipe1.servings = 4;
        recipe1.ingredients = ingredient1Entities;
        recipe1.instructions = "Flatten the garlic cloves with the end of a rolling pin, the side of a knife, "
         + "or in a pestle and mortar. (If you chop or fully crush the garlic it could burn when the chicken is baked.) "
         + "Put in a large bowl and add the buttermilk. Roughly chop the leaves from half the parsley, if using, "
         + "and return the rest to the fridge.  Stir the chopped parsley, rosemary, sugar, salt and pepper into the buttermilk. "
         + "Add the chicken and turn to coat in the marinade. Cover the bowl and leave in the fridge for at least 8 hours, or overnight. "
         + "Preheat the oven to 200C/180C Fan/Gas 6. Line a large baking tray with foil and place a rack on top. Take the chicken "
         + "out of the marinade, gently shaking off excess buttermilk and garlic. Place on the rack, with the thighs skin-side up. "
         + "Discard the marinade. Roast the chicken for 35–40 minutes, or until lightly browned in places and cooked through. "
         + "The chicken is cooked when the juices run clear when pierced with a skewer in the thickest part. Chop the remaining "
         + "parsley leaves and sprinkle over the chicken just before serving. Eat hot or cold with salad and baked potatoes, boiled "
         + "new potatoes or chips.";

        const recipe2 = new Recipe();
        recipe2.title = "Sausage meatball noodle stir-fry";
        recipe2.description = "It only takes minutes to make this delicious twist on the traditional stir-fry, with easy-to-make sausage meatballs. The recipe serves one, but can be doubled.";
        recipe2.cookingTime = 30;
        recipe2.servings = 1;
        recipe2.ingredients = ingredient2Entities;
        recipe2.instructions = "Preheat the oven to 160C/140C Fan/Gas 3. "
        + "Run a sharp knife down the centre of the sausages and peel off the skins. "
        + "Break up the sausage meat and put it in a bowl. Finely chop a spring onion and add it to the bowl. "
        + "Add the ginger, coriander stalks, 1 teaspoon soy sauce, half the garlic and chilli flakes and the sesame oil, if using. Mix well."
        + "Roll the mixture into four large meatballs. Heat a teaspoon of the vegetable oil in a large frying "
        + "pan or wok and cook the meatballs for 5–10 minutes, turning often, or until browned all over and cooked through. "
        + "Transfer to a baking tray and place in the oven to keep warm.  "
        + "Meanwhile, cook the noodles according to the packet instructions (or bring a pan of water to the boil, "
        + "add the noodles and cook for 3 minutes). Drain and rinse under cold water.  Thinly slice the remaining "
        + "two spring onions. Heat the remaining vegetable oil in the frying pan and add the remaining garlic "
        + "and chilli flakes, the sliced spring onions and carrot and stir-fry for 2–3 minutes, or until beginning "
        + "to soften. Add the noodles, beansprouts and remaining soy sauce and stir-fry for 2 minutes. "
        + "Add the meatballs and stir. Sprinkle with the coriander leaves, and more soy sauce if necessary, and serve immediately.";
      
        await this.recipeRepository.save(recipe1);
        await this.recipeRepository.save(recipe2);
      }
}