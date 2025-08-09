import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";
import * as api from "./api/api";
import type IRecipes from "./interfaces";
import RecipeCard from "./components/RecipeCard";
function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<IRecipes[]>([]);
  const pageNumber = useRef<number>(1);
  // handlers
  const handleSearchSubmit = async () => {
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes?.results ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleViewMoreButton = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipe = await api.searchRecipes(searchTerm, nextPage);
      setRecipes([...recipes, ...nextRecipe.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form
          action=""
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSearchSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Enter the Search Term..."
            required
            value={searchTerm}
            onChange={onChangeHandler}
          />
          <button>submit</button>
        </form>
        {recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </div>
          );
        })}
        <button className="view-more-button" onClick={handleViewMoreButton}>
          View More
        </button>
      </div>
    </>
  );
}

export default App;
