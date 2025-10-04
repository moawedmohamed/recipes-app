import { useState } from "react";
import { useDefaultRecipes } from "../hooks/useDefaultRecipes";
import type IRecipes from "../interfaces";
import Footer from "./ui/Footer";
import Navbar from "./ui/Navbar";
import Spinner from "./ui/Spinner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { token } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import { useToggleFavourite } from "../hooks/useToggleFavourite ";
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useFavouriteRecipe from "../hooks/useFavouriteRecipe";

const AllRecipes = () => {
  const { user } = useAuth();
  const limit = 10; // عدد المنتجات لكل صفحة
  const [currentPage, setCurrentPage] = useState(1); // حالة لتتبع الصفحة الحالية

  const {
    data: defaultRecipes,
    isLoading: defaultLoading,
    isError,
    error,
    isFetching,
    // للتحقق إذا كانت البيانات السابقة لا تزال معروضة
  } = useDefaultRecipes({ page: currentPage, limit }); // استخدام الصفحة الحالية
  console.log(defaultRecipes);
  
  const isPreviousData = isFetching && !defaultRecipes?.length;
  const { data: favouriteData } = useFavouriteRecipe(user?.id ?? 0);
  const navigate = useNavigate();
  const { toggleFavourite } = useToggleFavourite(user?.id ?? 0, token ?? "");
  const isUserAuthorized = !!user?.id && !!token;

  const handleFavouriteClick = (recipeId: number) => {
    if (!isUserAuthorized) {
      toast.error("You must have an account to add to favourites!");
      navigate("/login");
      return;
    }
    toggleFavourite.mutate(recipeId);
  };

  // الانتقال إلى الصفحة التالية
  const nextPage = () => {
    if (!isPreviousData) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // الانتقال إلى الصفحة السابقة
  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (defaultLoading) return <Spinner />;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <>
      <Navbar />

      {/* عرض وصفات الصفحة الحالية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-16 p-6 max-w-6xl mx-auto">
        {defaultRecipes?.length === 0 && (
          <div className="flex justify-center items-center ">
            <h1 className="text-5xl font-bold text-gray-600">
              No product found
            </h1>
          </div>
        )}
        {defaultRecipes?.map((product: IRecipes, index: number) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
              </Link>
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
            <div className="p-4">
              <h1 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h1>
            </div>
          </motion.div>
        ))}
      </div>

      {/* أزرار التنقل بين الصفحات */}
      <div className="flex justify-center items-center my-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaArrowLeft className="mr-2" /> Prev
        </button>

        <span className="text-lg font-medium">page {currentPage}</span>

        <button
          onClick={nextPage}
          disabled={isPreviousData || defaultRecipes?.length < limit}
          className={`flex items-center px-4 py-2 rounded-md ${
            isPreviousData || defaultRecipes?.length < limit
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>

      <Footer />
    </>
  );
};

export default AllRecipes;
