import { useDefaultRecipes } from "../hooks/useDefaultRecipes";

const Test = () => {
  const { data, isLoading, error } = useDefaultRecipes({ page: 1, limit: 10 });

  console.log("data:", data);
  console.log("isLoading:", isLoading);
  console.log("error:", error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(recipe => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default Test;
