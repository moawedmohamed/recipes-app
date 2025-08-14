import { useEffect, useState } from "react";
import type IRecipes from "../interfaces";
import * as api from "../api/api";

const Products = () => {
  const [products, setProducts] = useState<IRecipes[]>([]);
  useEffect(() => {
    const getProduct = async () => {
      const product = await api.getProducts();
      setProducts(product.results);
    };
    getProduct();
  }, []);
  console.log(products);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group relative"
          >
            {/* صورة المنتج */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
              />

              {/* التراكب مع الحركة */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white  text-gray-800 px-4 py-2 rounded-lg font-semibold shadow hover:bg-neutral-500 transition-transform duration-500 transform -translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                  View Recipe
                </button>
              </div>
            </div>

            {/* العنوان */}
            <div className="p-4">
              <h1 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
