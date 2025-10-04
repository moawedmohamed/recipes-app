import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { CartItem } from "../types"
import { toast } from "react-toastify";
import { token } from "../utils/constants";
interface UpdateCartInput {
    cartItemId: number;
    quantity: number;
}
export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ cartItemId, quantity, }: UpdateCartInput) => {

            const response = await axios.put(
                "http://localhost:5000/api/recipes/cart",
                { cartItemId, quantity }, // ✅ البيانات ترسل هنا
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // ✅ الهيدر هنا
                    },
                }
            );
            return response.data as CartItem[];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
        , onError: () => {
            toast.error("Failed to update item quantity");
        },
    })
}