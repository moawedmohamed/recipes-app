// AppLogic.tsx
import { useEffect, useRef, useState } from "react";
import * as api from "../api/api";
import type IRecipes from "../interfaces";
import { useQuery } from "@tanstack/react-query";


function AppLogic() {
    const token = localStorage.getItem("token") || ""
    console.log(token);
    
    const [recipes, setRecipes] = useState<IRecipes[]>([]);
    const [defaultRecipes, setDefaultRecipes] = useState<IRecipes[]>([]);
    const [favouriteRecipes, setFavouriteRecipes] = useState<number[]>([]); // فقط IDs
    const pageNumber = useRef<number>(1);

    const fetchDefaults = async () => {
        const product = await api.getProducts(token);
        return product.results;
    }
    useQuery({
        queryKey: ['defaultRecipes'],
        queryFn: fetchDefaults,
    })
    // جلب الوصفات الافتراضية أول مرة


    // جلب المفضلات من DB
    useEffect(() => {
        async function fetchFavouriteRecipe(userId:string) {
            try {
                const favourites = await api.getFavouriteRecipes(userId, token);
                // حفظ IDs فقط لتسهيل التحقق من اللون
                setFavouriteRecipes(favourites.map((r: IRecipes) => r.id));
            } catch (error) {
                console.log(error);
            }
        }
        fetchFavouriteRecipe();
    }, [token]);

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            setRecipes([]);
            return;
        }
        try {
            const recipesData = await api.searchRecipes(searchTerm, 1, token);
            setRecipes(recipesData?.results ?? []);
            pageNumber.current = 1;
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewMore = async () => {
        const nextPage = pageNumber.current + 1;
        try {
            const nextRecipe = await api.searchRecipes("", nextPage, token);
            setRecipes((prev) => [...prev, ...nextRecipe.results]);
            pageNumber.current = nextPage;
        } catch (error) {
            console.log(error);
        }
    };

    const toggleFavouriteRecipe = async (recipe: IRecipes) => {
        if (favouriteRecipes.includes(recipe.id)) {
            // إزالة من المفضلة
            await api.removeFavouriteRecipe({ recipeId: recipe.id, userId, token });
            setFavouriteRecipes(favouriteRecipes.filter((id) => id !== recipe.id));
        } else {
            // إضافة للمفضلة
            await api.addFavouriteRecipe({ recipeId: recipe.id, userId, token });
            setFavouriteRecipes([...favouriteRecipes, recipe.id]);
        }
    };

    return {
        recipes,
        defaultRecipes,
        favouriteRecipes,
        handleSearch,
        handleViewMore,
        toggleFavouriteRecipe,
    };
}

export default AppLogic;
