import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/api'; // دوال add/remove favourite
import { toast } from 'react-toastify';

export const useToggleFavourite = (userId: number, token: string) => {
    const queryClient = useQueryClient();

    const toggleFavourite = useMutation({
        mutationFn: (recipeId: number) =>
            api.addFavouriteRecipe({ recipeId, token }), // ✅ ابعت بس id + token في الهيدر
        onSuccess: (res) => {
            const { message } = res; // backend بيرجع كده بعد التعديل الأخير
            queryClient.invalidateQueries({ queryKey: ['favourites', userId] });
            toast.success(message);
        },
        onError: () => {
            toast.error("Something went wrong. Please try again.");
        },
    });

    return { toggleFavourite };
};


// const removeFavouriteMutation = useMutation({
//     mutationFn: (recipeId: number) => api.removeFavouriteRecipe({ recipeId, token }),
//     onSuccess: () => {
//         queryClient.invalidateQueries({
//             queryKey: ['favourites', userId]
//         });
//         toast.success('Recipe removed from favourites!')
//     },
//     onError: () => {
//         toast.error("Something went wrong. Please try again.");
//     },
// });

// const toggleFavourite = (recipeId: number, isFavourite: boolean) => {
//     if (isFavourite) {
//         removeFavouriteMutation.mutate(recipeId);
//     } else {
//         addFavouriteMutation.mutate(recipeId);
//     }
// };

// return { toggleFavourite, addFavouriteMutation, removeFavouriteMutation };

