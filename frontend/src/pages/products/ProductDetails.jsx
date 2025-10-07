import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/products/productsSlice";
import Loader from "../../components/Loader";
import { addToCart } from "../../features/cart/cartSlice";
import RatingStars from "../../components/RatingStars";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, qty }));
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow"
        />
      </div>

      {/* Product Info */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <RatingStars rating={product.rating} />
        <p className="text-xl font-semibold text-green-600">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <label htmlFor="qty" className="font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="qty"
            value={qty}
            min="1"
            max={product.countInStock || 10}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-20 border border-gray-300 rounded px-2 py-1"
          />
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition-colors"
          >
            Add to Cart
          </button>
        </div>

        {/* Stock Info */}
        <p className={`mt-2 font-medium ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
