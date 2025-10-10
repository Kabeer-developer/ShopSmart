import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go back</Link></p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id || item.id} className="flex justify-between items-center border p-4 rounded">
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>

              {/* Quantity + Remove */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={item.qty}
                  min={1}
                  className="w-16 border p-1 rounded text-center"
                  onChange={(e) => handleQtyChange(item, Number(e.target.value))}
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between font-bold text-xl mt-4">
            <p>Total: ₹{totalPrice.toFixed(2)}</p>
            <Link
              to="/checkout"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
