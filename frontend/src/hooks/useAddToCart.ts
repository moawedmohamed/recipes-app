import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { CartItem } from "../types";
import { toast } from "react-toastify";
import { token } from "../utils/constants";

export const useAddToCart = () => {
    const queryClient = useQueryClient();

    return useMutation<CartItem, Error, Omit<CartItem, "id" | "createdAt">>({
        mutationFn: async (cartItem) => {
            console.log("📦 Sending:", cartItem);
            try {
                const { data } = await axios.post<CartItem>(
                    "http://localhost:5000/api/recipes/cart",
                    cartItem,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                console.log("✅ Response:", data);
                return data;
            } catch (err: any) {
                console.error("❌ Error response:", err.response?.data || err.message);
                throw err; // لازم ترميه عشان react-query تعرف إنه حصل خطأ
            }
        },
        onError: (error) => {
            toast.error("Failed to add item to cart");
            console.error("⚠️ Mutation failed:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })

            toast.success("Item added to cart!");
        }
    })
}