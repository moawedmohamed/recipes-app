import React, { useState } from "react";
import { useGetCart } from "../hooks/useGetCart";
import Spinner from "./ui/Spinner";
import type { CartItem } from "../types";
import { FaEye, FaTrash } from "react-icons/fa";
import useProductDetails from "../hooks/useProductDetails";
import { Link } from "react-router-dom";
import { button } from "framer-motion/m";
import { useDeleteCart } from "../hooks/useDeleteCart";
import { useUpdateCart } from "../hooks/useUpdateCart";

const Cart = () => {
  const { data, isLoading, isError, error } = useGetCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteItem } = useDeleteCart();

  const handleIncrease = (id: number, quantity: number) => {
    const newQty = quantity + 1;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    updateCart({ cartItemId: id, quantity: newQty });
  };

  const handleDecrease = (id: number, quantity: number) => {
    const newQty = quantity > 1 ? quantity - 1 : 1;
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
    updateCart({ cartItemId: id, quantity: newQty });
  };

  const handleDelete = (id: number) => {
    alert(`Delete item with id: ${id}`);
    deleteItem(id);
    // 🔥 هنا بعدين تقدر تضيف API لحذف العنصر فعليًا
  };

  if (isLoading) return <Spinner />;
  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛒 Your Cart
      </h2>

      {data && data.length === 0 && (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data &&
          data.map((item: CartItem) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-2">💲 {item.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() =>
                    handleDecrease(
                      item.id,
                      quantities[item.id] || item.quantity
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300"
                >
                  −
                </button>
                <span className="text-gray-800 font-semibold">
                  {quantities[item.id] || item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleIncrease(
                      item.id,
                      quantities[item.id] || item.quantity
                    )
                  }
                  className="bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                {/* زر الـ View داخل الـ Link */}
                <Link to={`/product/${item.id}`}>
                  <button className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition">
                    <FaEye />
                    View
                  </button>
                </Link>

                {/* زر الـ Delete خارج الـ Link */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
