import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../images/sliderA_01.jpg";
import image2 from "../images/sliderA_02.jpg";
import image3 from "../images/sliderA_03.jpg";
import image4 from "../images/sliderA_04.jpg";
import image5 from "../images/sliderA_05.jpg";

const recipes = [
  {
    id: 1,
    category: "CURRY",
    title: "Mexican Grilled Corn Recipe",
    servings: 4,
    time: "1 HR 20 MIN",
    author: "Sandra Fortin",
    imageUrl: image1,
  },
  {
    id: 2,
    category: "MEXICAN",
    title: "Curry Roast Chicken With Lemon Gravy",
    servings: 2,
    time: "30 MIN",
    author: "John Doe",
    imageUrl: image2,
  },
  {
    id: 3,
    category: "SALAD",
    title: "Avocado Melon Salad With Lime Vinaigrette",
    servings: 3,
    time: "20 MIN",
    author: "Jane Smith",
    imageUrl: image3,
  },
  {
    id: 4,
    category: "DESSERT",
    title: "Chocolate Fudge Brownies",
    servings: 6,
    time: "45 MIN",
    author: "Emily Clark",
    imageUrl: image4,
  },
  {
    id: 5,
    category: "BREAKFAST",
    title: "Fluffy Pancakes with Maple Syrup",
    servings: 4,
    time: "25 MIN",
    author: "Michael Lee",
    imageUrl: image5,
  },
];

const RecipeMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRecipe = recipes[activeIndex];

  return (
    <div className="max-w-full mx-auto">
      <div className="relative">
        {/* Image animation */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`image-${activeRecipe.id}`}
            src={activeRecipe.imageUrl}
            alt={activeRecipe.title}
            className="h-[500px] object-cover brightness-[.68]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.4 },
            }}
          />
        </AnimatePresence>

        {/* All content animation together */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${activeRecipe.id}`}
            className="absolute top-28 left-48 text-white max-w-md bg-opacity-60 p-4 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.6, duration: 0.5 },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <span className="bg-green-500 px-3 py-1 text-xs uppercase font-semibold rounded inline-block">
              {activeRecipe.category}
            </span>

            <h1
              style={{ fontFamily: "'Arvo', serif" }}
              className="text-[50px] leading-[60px] mt-[14px] text-white font-thin"
            >
              {activeRecipe.title}
            </h1>

            <div className="flex space-x-4 mt-2 text-sm font-semibold">
              <span className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6z" />
                </svg>
                <span>{activeRecipe.servings} Servings</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V7a1 1 0 10-2 0v2a1 1 0 00.293.707l1.414 1.414a1 1 0 101.414-1.414L11 7z" />
                </svg>
                <span>{activeRecipe.time}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10c1.104 0 2-.896 2-2S8.104 6 7 6 5 6.896 5 8s.896 2 2 2zM7 12c-2 0-6 1-6 3v1h12v-1c0-2-4-3-6-3z" />
                </svg>
                <span>By {activeRecipe.author}</span>
              </span>
            </div>

            <button className="mt-6 px-5 py-2 border border-white text-white font-semibold rounded hover:bg-white hover:text-green-600 transition">
              View Recipe
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex border-t border-gray-300 mt-0 max-w-7xl mx-auto">
        {recipes.map((recipe, idx) => (
          <button
            key={recipe.id}
            onClick={() => setActiveIndex(idx)}
            className={`flex-1 px-4 py-3 text-center font-semibold text-gray-600 hover:text-green-600 transition
              ${
                idx === activeIndex ? "bg-green-400 text-white" : "bg-gray-100"
              }`}
          >
            {recipe.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeMain;
