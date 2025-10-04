import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CartItem } from "../types"
import { toast } from "react-toastify"
import axios from "axios"

export const useDeleteCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (cartItemId: number) => {
            const response = await axios.delete(`http://localhost:5000/api/recipes/cart/${cartItemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            
            })
            return response.data as CartItem[];
        },
        onSuccess: () => {
            toast.success("🗑️ Item removed from cart");
            // ✅ إعادة تحميل السلة بعد الحذف
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (error) => {
            toast.error("Failed to remove item from cart");
            console.error("⚠️ Mutation failed:", error);
        },
    })
}
