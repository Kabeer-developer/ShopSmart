import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder, resetOrder } from "../../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { order, loading, error, success } = useSelector((state) => state.orders);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);
      dispatch(resetOrder());
    }
  }, [success, navigate, order, dispatch]);

  const handlePlaceOrder = () => {
    const orderData = {
      orderItems: cartItems.map((item) => ({
        name: item.name,
        qty: item.qty,
        price: item.price,
        product: item.productId,
      })),
      shippingAddress,
      paymentMethod: "COD", // For now
      totalPrice: subtotal,
    };
    dispatch(createOrder(orderData));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <h2 className="font-semibold">Shipping</h2>
        <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Items</h2>
        {cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between py-1 border-b">
            <p>{item.name} x {item.qty}</p>
            <p>${(item.price * item.qty).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mb-4 font-semibold text-lg">
        Total: ${subtotal.toFixed(2)}
      </div>
      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
