// Products.tsx
import { motion } from "framer-motion";
import { FaSearch, FaHeart } from "react-icons/fa";
import { memo, useState } from "react";
// import AppLogic from "../AppLogic";
import { useDefaultRecipes } from "../hooks/useDefaultRecipes";
import type IRecipes from "../interfaces";
import Spinner from "./ui/Spinner";
import useFavouriteRecipe from "../hooks/useFavouriteRecipe";
import { useAuth } from "../context/AuthContext";
import { token } from "./../utils/constants";
import useSearchRecipes from "../hooks/useSearchRecipes";
import { useToggleFavourite } from "../hooks/useToggleFavourite ";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Products = memo(() => {
  const { user } = useAuth();
  const { data: defaultRecipes, isLoading: defaultLoading } =
    useDefaultRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchedRecipes } = useSearchRecipes(searchTerm);
  const { data: favouriteData } = useFavouriteRecipe(user?.id ?? 0);
  const { addFavouriteMutation } = useToggleFavourite(
    user?.id ?? 0,
    token ?? ""
  );
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };
  // const { handleSearch, toggleFavouriteRecipe, favouriteRecipes } = AppLogic();
  const allSearchedRecipes = searchedRecipes?.pages.flat() ?? [];
  console.log(favouriteData);

  const displayedRecipes =
    allSearchedRecipes.length > 0 ? allSearchedRecipes : defaultRecipes ?? [];
  // if (!token) {
  //   console.log("token not found ");
  //   return;
  // }
  const isUserAuthorized = !!user?.id && !!token;
  const handleFavouriteClick = (recipeId: number) => {
    if (!isUserAuthorized) {
      toast.error("You must have an account to add to favourites!");
      navigate("/login"); // أو استخدم useNavigate لو React Router
      return;
    }
    addFavouriteMutation.mutate(recipeId);
  };
  // if (!user?.id) return null;
  return (
    <>
      {/* Search bar */}
      <div className="flex flex-col md:flex-row items-center w-full gap-4 max-w-5xl mx-auto mt-10">
        <h1 className="whitespace-nowrap text-lg font-semibold self-start md:self-center">
          Latest Recipes
        </h1>
        <hr className="flex-1 border-t border-gray-300 md:w-[200px]" />
        <div className="flex items-stretch w-full md:w-auto">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-10"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-lg flex items-center justify-center h-10"
            onClick={() => handleSearch()}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 p-6 max-w-6xl mx-auto">
        {defaultLoading ? (
          <Spinner />
        ) : (
          displayedRecipes?.[0]?.results?.map(
            (product: IRecipes, index: number) => (
              <motion.div
                key={product.title}
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
                    onClick={() => handleFavouriteClick(product.id)}
                  >
                    <FaHeart
                      className={
                        isUserAuthorized &&
                        favouriteData?.some(
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
            )
          )
        )}
      </div>
    </>
  );
});

export default Products;
