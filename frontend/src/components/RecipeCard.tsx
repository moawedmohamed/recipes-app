import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type IRecipes from "../interfaces";
import { useToggleFavourite } from "../hooks/useToggleFavourite ";
import { useAuth } from "../context/AuthContext";
const token = localStorage.getItem("token");
interface IProps {
  recipe: IRecipes;
  onClick: () => void;
  isFavourite: boolean;
}
const RecipeCard = ({ recipe, onClick, isFavourite }: IProps) => {
  const { user } = useAuth();
  console.log(user);

  const { toggleFavourite } = useToggleFavourite(user?.id ?? 0, token ?? "");
  if (!user) {
    return;
  }
  if (!token) {
    console.log("token not found");
    return;
  }
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="" />
      <div className="recipe-card-title flex items-end gap-3">
        <span
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite.mutate(recipe.id);
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
