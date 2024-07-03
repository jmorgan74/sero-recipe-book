import React, { useState } from 'react';
import { Recipe, Ingredient } from '../types/Recipe';

interface RecipeFormProps {
  addRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipe }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState(0);
  const [servings, setServings] = useState(0)
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState('');
  const [newIngredientName, setNewIngredientName] = useState('');
  const [newIngredientQuantity, setNewIngredientQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecipe({ title, description, cookingTime, servings, ingredients: selectedIngredients, instructions });
    setTitle('');
    setDescription('');
    setCookingTime(0);
    setServings(0);
    setSelectedIngredients([]);
    setInstructions('');
  };

  const handleAddIngredient = () => {
    const ingredient = { name: newIngredientName, quantity: newIngredientQuantity };
    setSelectedIngredients([...selectedIngredients, ingredient]);
    setNewIngredientName('');
    setNewIngredientQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <div className="form-group">
                <label htmlFor="recipe-title">Recipe Title</label>
                <input type="text" id="recipe-title" name="recipe-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="recipe-description">Description</label>
                <textarea id="recipe-description" name="recipe-description" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label htmlFor="recipe-cooking-time">Cooking Time (mins)</label>
                <input type="text" id="recipe-cooking-time" name="recipe-cooking-time" value={cookingTime} onChange={(e) => setCookingTime(parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
                <label htmlFor="recipe-servings">Servings</label>
                <input type="text" id="recipe-servings" name="recipe-servings" value={servings} onChange={(e) => setServings(parseInt(e.target.value))} required />
            </div>
        </div>

        <div className="ingredients">
            <div className="ingredients-header">
                <h2>Ingredients</h2>
                <button type="button" className="add-ingredient-btn" onClick={handleAddIngredient}>Add Ingredient</button>
            </div>
            <div className="ingredient-item">
                <input type="text" id="recipe-ingredient-item-quantity" name="recipe-ingredient-item-quantity" value={newIngredientQuantity} onChange={(e) => setNewIngredientQuantity(e.target.value)} placeholder="Quantity" />
                <input type="text" id="recipe-ingredient-item-name" name="recipe-ingredient-item-name" value={newIngredientName} onChange={(e) => setNewIngredientName(e.target.value)} placeholder="Name" />
                
            </div>
        </div>

        <table id="ingredient-list">
          {selectedIngredients.map((ingredient, index) => (
            <tr key={index}>
                <td>{ingredient.quantity} {ingredient.name}</td>
                <td className="ingredient-delete"><button type="button" className="remove-ingredient-btn">&times;</button></td>
            </tr>
          ))}
        </table>

        <div className="form-group">
            <label htmlFor="recipe-instructions">Cooking Method</label>
            <textarea id="recipe-instructions" name="recipe-instructions" rows={6} value={instructions} onChange={(e) => setInstructions(e.target.value)} required/>
        </div>
      
        <button type="submit" className="submit-btn">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
