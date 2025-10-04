import { useQuery } from "@tanstack/react-query"
import type { CartItem } from "../types"
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useGetCart = () => {
    const { user } = useAuth(); // عشان يتأكد إن المستخدم مسجّل دخول
    return useQuery<CartItem[], Error>({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/api/recipes/cart", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                params: {
                    userId: user?.id
                },
            });
            return res.data.data; // ✅ هنا ترجع المصفوفة فقط
        },
    })
}