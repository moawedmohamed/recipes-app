// Products.tsx
import { motion } from "framer-motion";
import { FaSearch, FaHeart } from "react-icons/fa";
import { memo, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAddToCart } from "../hooks/useAddToCart";
import type { CartItem, Recipe } from "../types";
const Products = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchedRecipes, refetch } = useSearchRecipes(searchTerm);
  useEffect(() => {
    if (searchTerm.trim()) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const { mutate: addToCart, data: cartData } = useAddToCart();

  const { user } = useAuth();
  const { data: defaultRecipes, isLoading: defaultLoading } = useDefaultRecipes(
    { page: 1, limit: 20 }
  );
  const { data: favouriteData } = useFavouriteRecipe(user?.id ?? 0);
  const { toggleFavourite } = useToggleFavourite(user?.id ?? 0, token ?? "");
  const navigate = useNavigate();
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };
  // const { handleSearch, toggleFavouriteRecipe, favouriteRecipes } = AppLogic();
  const allSearchedRecipes: Recipe[] = searchedRecipes?.pages.flat() ?? [];
  console.log(searchedRecipes);

  // const displayedRecipes =
  //   allSearchedRecipes.length > 0 ? allSearchedRecipes : defaultRecipes ?? [];

  console.log(searchedRecipes);
  const isUserAuthorized = !!user?.id && !!token;
  const handleFavouriteClick = (recipeId: number) => {
    if (!isUserAuthorized) {
      toast.error("You must have an account to add to favourites!");
      navigate("/login"); // أو استخدم useNavigate لو React Router
      return;
    }
    toggleFavourite.mutate(recipeId);
  };
  const handleAddToCart = (product: Recipe) => {
    console.log("Adding to cart:", product);
    addToCart({
      userId: user?.id ?? 0,
      recipeId: product.id,
      title: product.title,
      image: product.image,
      price: product.pricePerServing,
      quantity: 1,
    });
  };
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
          defaultRecipes?.map((product: Recipe, index: number) => (
            <motion.div
              // key={product.results.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Product image */}
              <div className="relative group">
                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-lg shadow"
                  />
                </Link>

                {/* Dark Overlay */}
                <div
                  className="
                          absolute inset-0 bg-black 
                          opacity-0 group-hover:opacity-40
                          transition-opacity duration-300 rounded-lg
                        "
                ></div>

                {/* Add to Cart button */}
                <div
                  className="
                              absolute inset-0 flex items-center justify-center
                              opacity-0 group-hover:opacity-100
                              translate-y-5 group-hover:translate-y-0
                              transition-all duration-300
                            "
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 border-2 border-green-500 text-green-500 font-semibold rounded-lg shadow hover:bg-green-500 hover:text-white transition"
                  >
                    Add to cart
                  </button>
                </div>

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
          ))
        )}
      </div>
    </>
  );
});

export default Products;
