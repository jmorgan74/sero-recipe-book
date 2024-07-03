import axios from "axios";
import { useState, useEffect } from "react";
import RecipeList from "../../components/RecipeList";
import SearchBar from "../../components/SearchBar";
import { Recipe } from "../../types/Recipe";
import "./home.css";

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => {
    if (recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
    
    return recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div>
      <div className="form-header">
          <h1>Recipes</h1>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default Home;
