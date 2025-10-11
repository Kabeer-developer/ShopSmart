import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  // 🧮 Calculate total
  const total = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleQtyChange = (id, qty) => {
    const validQty = Math.max(1, Number(qty));
    dispatch(updateQuantity({ id, qty: validQty }));
  };

  if (items.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b py-4 gap-4"
          >
            {/* 🖼 Product Image */}
            <img
              src={item.image || "https://via.placeholder.com/100"}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* 📦 Product Info */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            {/* 🔢 Quantity */}
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => handleQtyChange(item._id, e.target.value)}
              className="border rounded w-16 text-center p-1"
            />

            {/* 🗑 Remove */}
            <button
              onClick={() => dispatch(removeFromCart(item._id))}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* 🧾 Total + Buttons */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold">
          Total: ₹{total.toFixed(2)}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
