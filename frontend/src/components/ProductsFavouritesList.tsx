import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import type IRecipes from "../interfaces";
import Spinner from "./ui/Spinner";
import { motion } from "framer-motion";
import { token } from "../utils/constants";
import { useToggleFavourite } from "../hooks/useToggleFavourite ";
import useFavouriteRecipeList from "../hooks/useFavouriteRecipeList";
import Navbar from "./ui/Navbar";

const ProductsList = () => {
  // const { handleSearch, toggleFavouriteRecipe, favouriteRecipes } = AppLogic();
  const { user } = useAuth();

  const { data, isLoading } = useFavouriteRecipeList(user?.id ?? 0);
  const { toggleFavourite } = useToggleFavourite(user?.id ?? 0, token ?? "");
  console.log(data);
  if (!token) {
    console.log("token not found ");
    return;
  }
  if (!user?.id) return null;
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <h1 className="text-5xl">Favourite Recipes</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 p-6 max-w-6xl mx-auto ">
        {isLoading ? (
          <Spinner />
        ) : (
          data?.map((product: IRecipes, index: number) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Product image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                {/* Favourite button */}
                <button
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-100 transition"
                  onClick={() => toggleFavourite.mutate(product.id)}
                >
                  <FaHeart
                    className={
                      data?.some(
                        (r: { recipeId: number }) => r.recipeId === product.id
                      )
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              {/* Title */}
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h1>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductsList;
