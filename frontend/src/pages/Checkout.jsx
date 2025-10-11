import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items = [] } = useSelector((state) => state.cart || {});

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    const orderData = {
      orderItems: items,
      totalPrice,
    };
    dispatch(createNewOrder(orderData));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout Summary</h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="divide-y divide-gray-200 mb-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">
                  ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="border-t pt-4 text-right">
            <p className="text-lg">
              <span className="font-semibold">Total Items:</span> {items.length}
            </p>
            <p className="text-xl font-bold mt-2">
              Total Price: ₹{totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
