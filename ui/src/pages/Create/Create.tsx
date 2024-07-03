import axios from "axios";
import { useState } from "react";
import RecipeForm from "../../components/RecipeForm";
import { Recipe } from "../../types/Recipe";
import "./create.css";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const history = useHistory();

  const addRecipe = async (recipe: Recipe) => {
    try {
      const response = await axios.post('/api/recipes', recipe);
      setRecipes([...recipes, response.data]);
      history.push('/');
    } catch (error) {
      console.error('Error adding recipe', error);
    }
  };

  return (
    <div>
      <div className="form-header">
          <h1>Create a Recipe</h1>
      </div>
      <RecipeForm addRecipe={addRecipe} />
    </div>
  );
};

export default Home;