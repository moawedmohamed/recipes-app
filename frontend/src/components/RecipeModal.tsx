import { useEffect, useState } from "react";
import type { ISummary } from "../interfaces";
import DOMPurify from "dompurify";
import { getRecipeSummary } from "../api/api";
import "../index.css";
interface Props {
  recipeId: string;
  onClose: () => void;
}
const RecipeModal = ({ recipeId, onClose }: Props) => {
  const [recipeSummary, setRecipeSummary] = useState<ISummary>();
  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);
  if (!recipeSummary) {
    return <></>;
  }
  const cleanHTML = DOMPurify.sanitize(recipeSummary.summary);
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span
              className="close-btn text-4xl  cursor-pointer"
              onClick={onClose}
            >
              &times;
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: cleanHTML }}></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
