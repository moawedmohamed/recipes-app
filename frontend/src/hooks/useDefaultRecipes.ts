// useDefaultRecipes.js
import { useQuery } from '@tanstack/react-query';
import * as api from '../api/api'; // مكان ملف الـ api بتاعك

const fetchDefaults = async () => {
    const products = await api.getProducts(localStorage.getItem("token") ?? undefined);
    if (Array.isArray(products)) return products
    if (products.results && Array.isArray(products.results)) return products.results;
    return [];
};

export const useDefaultRecipes = () => {
    return useQuery({
        queryKey: ['defaultRecipes'],
        queryFn: fetchDefaults,
    });
};
