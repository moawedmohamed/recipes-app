import { useParams } from "react-router-dom";
import useProductDetails from "../hooks/useProductDetails";
import Spinner from "./ui/Spinner";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductDetails(Number(id));

  if (!id) return null;
  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading product</p>;
  if (!product) return <p>No product found</p>;

  return (
    <>

      <div className="max-w-3xl mx-auto p-4">
        {/* عنوان الوصفة */}
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>

        {/* صورة */}
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-md mb-4"
        />

        {/* تفاصيل أساسية */}
        <p>
          ⏱ Ready in: <strong>{product.readyInMinutes} minutes</strong>
        </p>
        <p>
          🍽 Servings: <strong>{product.servings}</strong>
        </p>
        <p>
          ❤️ Likes: <strong>{product.aggregateLikes}</strong>
        </p>

        {/* المكونات */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside space-y-1">
          {product.extendedIngredients?.map((ing: any) => (
            <li key={ing.id}>
              {ing.amount} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>

        {/* التعليمات */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Instructions:</h3>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: product.instructions }}
        />
      </div>
    </>
  );
}

export default ProductDetails;
