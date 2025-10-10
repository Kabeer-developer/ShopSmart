import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handlePlaceOrder = () => {
    const orderData = {
      orderItems: cartItems,
      totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    };
    dispatch(createNewOrder(orderData));
    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
