import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow hover:shadow-md">
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 mt-1">₹{product.price}</p>
      <div className="mt-3 flex justify-between items-center">
        <Link to={`/products/${product._id}`} className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
          View
        </Link>
        <span className="text-sm text-gray-500">{product.category || "General"}</span>
      </div>
    </div>
  );
};

export default ProductCard;
