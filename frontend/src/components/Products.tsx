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
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h1>{product.title}</h1>
            <img src={product.image} alt="" />
          </div>
        );
      })}
    </>
  );
};

export default Products;
