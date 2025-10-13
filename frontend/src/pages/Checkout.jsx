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
      orderItems: items.map((item) => ({
        name: item.name,
        quantity: item.qty,
        image: item.image,
        price: item.price,
        product: item._id,
      })),
      shippingAddress: {
        address: "123 Main Street",
        city: "Bangalore",
        postalCode: "560001",
        country: "India",
      },
      paymentMethod: "Cash on Delivery",
      totalPrice,
    };

    dispatch(createNewOrder(orderData));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
            <p className="mt-1 text-sm text-gray-600">Review your order before placing</p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 px-6">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-sm text-gray-500">Add items to your cart to proceed with checkout.</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="px-6 py-4 divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item._id} className="py-4 flex gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">₹{item.price} × {item.qty}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Method */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Payment Method</span>
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Cash on Delivery
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="px-6 py-5 bg-white border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items ({items.length})</span>
                    <span className="text-gray-900">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Place Order
                </button>

                <p className="mt-4 text-xs text-center text-gray-500">
                  By placing your order, you agree to our terms and conditions
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;