// Products.tsx
import { motion } from "framer-motion";
import { FaSearch, FaHeart } from "react-icons/fa";
import { useState } from "react";
import AppLogic from "../AppLogic";
const Products = () => {
  const {
    recipes,
    defaultRecipes,
    handleSearch,
    toggleFavouriteRecipe,
    favouriteRecipes,
  } = AppLogic();

  const [searchTerm, setSearchTerm] = useState("");

  const displayedRecipes = recipes.length > 0 ? recipes : defaultRecipes;

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
            onClick={() => handleSearch(searchTerm)}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 p-6 max-w-6xl mx-auto">
        {displayedRecipes.map((product, index) => (
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
                onClick={() => toggleFavouriteRecipe(product)}
              >
                <FaHeart
                  className={
                    favouriteRecipes.includes(product.id)
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
        ))}
      </div>
    </>
  );
};

export default Products;
