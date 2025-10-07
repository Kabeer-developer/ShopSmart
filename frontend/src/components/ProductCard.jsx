import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
      </Link>
    </div>
  );
}

export default ProductCard;
