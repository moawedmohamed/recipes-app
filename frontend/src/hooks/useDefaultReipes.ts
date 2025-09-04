// useDefaultRecipes.js
import { useQuery } from '@tanstack/react-query';
import * as api from '../api/api'; // مكان ملف الـ api بتاعك

const fetchDefaults = async () => {
    const product = await api.getProducts(sessionStorage.getItem("token")||"");
    return product.results;
};

export const useDefaultRecipes = () => {
    return useQuery({
        queryKey: ['defaultRecipes'],
        queryFn: fetchDefaults,
    });
};
