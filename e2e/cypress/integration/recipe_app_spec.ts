describe("Recipe tests", () => {
  it(`Given I have a new recipe
      When I add the new recipe name
      And description
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
        cy.visit('http://localhost:3000/create');

        cy.get('[id="recipe-title"]')
          .type("Mary Berry's Sticky Toffee Pudding");

        cy.get('[id="recipe-description"]')
          .type("Mary's all-in-one sticky toffee pudding is sticky, gooey and surprisingly light and easy. Baked in a large dish, this is a family-sized pudding, spooned out or cut into squares to serve. For this recipe you will need a 1.7-litre/3-pint ovenproof dish and an electric whisk. Each serving provides 927 kcal, 9g protein, 88g carbohydrates (of which 60g sugars), 59g fat (of which 36g saturates), 1.5g fibre and 1.9g salt.");

        cy.get('[id="recipe-cooking-time"]')
          .type('60');

        cy.get('[id="recipe-servings"]')
          .type('6');

        const ingredients = [
          { quantity: "100g", name: "Butter" },
          { quantity: "175g", name: "Light muscovado sugar" },
          { quantity: "2", name: "Free range eggs" },
          { quantity: "225g", name: "Self-raising flour" },
          { quantity: "1tsp", name: "Baking powder" },
          { quantity: "1tsp", name: "Bicarbonate of soda" },
          { quantity: "3tbsp", name: "Black treacle" },
          { quantity: "275ml", name: "Full-fat milk" }
        ];

        ingredients.forEach(ingredient => {
          cy.get('[id="recipe-ingredient-item-quantity"]')
            .type(`${ingredient.quantity}`);

          cy.get('[id="recipe-ingredient-item-name"]')
            .type(`${ingredient.name}`);
        
          cy.contains('Add Ingredient').click();
        });

        cy.get('[id="recipe-instructions"]')
          .type('Mix is all up nicely!');

        cy.contains('Add Recipe').click();

        cy.intercept('POST', '/api/recipes', (req) => {
          expect(req.body).to.include('Mary Berry');
        });
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
      
        cy.visit('http://localhost:3000/');

        cy.contains('Buttermilk chicken');
        cy.contains('Sausage meatball noodle stir-fry');
        cy.contains("Mary Berry's Sticky Toffee Pudding");

        cy.get('[id="recipe-search"]')
          .type('chicken');

        cy.contains('Buttermilk chicken');

        cy.contains('Sausage meatball noodle stir-fry').should('not.exist');
        cy.contains("Mary Berry's Sticky Toffee Pudding").should('not.exist');
  });

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {

        cy.visit('http://localhost:3000/');

        cy.contains('Buttermilk chicken');
        cy.contains('Sausage meatball noodle stir-fry');
        cy.contains("Mary Berry's Sticky Toffee Pudding");

        cy.get('[id="recipe-search"]')
          .type('milk');

        cy.contains('Buttermilk chicken');
        cy.contains("Mary Berry's Sticky Toffee Pudding");
        
        cy.contains('Sausage meatball noodle stir-fry').should('not.exist');
        
  });
});
