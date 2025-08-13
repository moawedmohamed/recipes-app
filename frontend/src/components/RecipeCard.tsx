import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type IRecipes from "../interfaces";
interface IProps {
  recipe: IRecipes;
  onClick: () => void;
  onFavouriteButtonClick: (recipe: IRecipes) => void;
  isFavourite: boolean;
}
const RecipeCard = ({
  recipe,
  onClick,
  onFavouriteButtonClick,
  isFavourite,
}: IProps) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <div className="recipe-card-title flex items-end gap-3">
        <span
          onClick={(e) => {
            e.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
