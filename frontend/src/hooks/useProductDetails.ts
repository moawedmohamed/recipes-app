import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async (id: number) => {
    console.log("Fetching recipe id:", id);
    const res = await axios.get(`http://localhost:5000/api/recipes/recipe/${id}`);
    console.log(res.data);
    
    return res.data;
}

const useProductDetails = (id: number) => {
    return useQuery({
        queryKey: ['details', id],
        queryFn: () => fetchData(id),
        enabled: !!id
    })
}
export default useProductDetails;
