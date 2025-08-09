import type IRecipes from "../interfaces";
interface IProps {
  recipe: IRecipes;
}
const RecipeCard = ({ recipe }: IProps) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt="" />
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
