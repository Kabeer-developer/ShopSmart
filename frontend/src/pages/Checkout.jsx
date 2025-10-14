import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewOrder } from "../redux/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { items } = useSelector((state) => state.cart);
const cartItems = items || [];
  const { user } = useSelector((state) => state.auth);

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

const totalPrice = (items?.reduce((acc, item) => acc + item.price * item.qty, 0)) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      alert("Please fill all address fields");
      return;
    }

    const orderData = {
      user: user._id,
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.qty,
        price: item.price,
      })),
      shippingAddress,
      paymentMethod,
      totalPrice,
    };

    dispatch(createNewOrder(orderData))
      .unwrap()
      .then(() => {
        alert("Order placed successfully!");
        navigate("/orders");
      })
      .catch((error) => {
        alert(error || "Order failed");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold">Shipping Address</h3>
        <input
          type="text"
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full border p-2 rounded"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Postal Code"
          className="w-full border p-2 rounded"
          value={shippingAddress.postalCode}
          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          className="w-full border p-2 rounded"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
        />

        <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
        <select
          className="w-full border p-2 rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Cash on Delivery</option>
          <option>Credit/Debit Card</option>
          <option>UPI</option>
        </select>

        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between mb-1">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <p className="font-bold mt-3">Total: ₹{totalPrice.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
