import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import { addReview, fetchReviews } from "../redux/slices/reviewSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading: productLoading, error: productError } = useSelector((state) => state.products);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.reviews);
  const { user } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch product and reviews on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchReviews(id));
    }
  }, [dispatch, id]);

  if (productLoading) return <p className="text-center mt-10">Loading product...</p>;
  if (productError) return <p className="text-center text-red-500 mt-10">{productError}</p>;
  if (!product) return null;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, qty: quantity }));
    navigate("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ productId: id, rating, comment }))
      .unwrap()
      .then(() => {
        setRating(0);
        setComment("");
        dispatch(fetchReviews(id)); // refresh the reviews list
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-blue-600">
        ← Back
      </button>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={product.image || "https://via.placeholder.com/500"}
          alt={product.name}
          className="w-full rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">₹{product.price}</p>

          <div className="mb-4">
            <label className="mr-2">Qty:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border w-16 text-center rounded p-1"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {/* Review List */}
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : reviews?.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="mb-4 border-b pb-3">
              <p className="font-semibold">{r.user?.name || "Anonymous"}</p>
              <p className="text-yellow-500">⭐ {r.rating}/5</p>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Add Review Form */}
        {user ? (
          <form onSubmit={handleReviewSubmit} className="mt-6">
            <h4 className="font-semibold mb-2">Write a Review</h4>

            <div className="mb-3">
              <label className="block text-sm font-medium">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select...</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} - {["Poor", "Fair", "Good", "Very Good", "Excellent"][num - 1]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 rounded w-full"
                rows="3"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mt-4">Please login to write a review.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
