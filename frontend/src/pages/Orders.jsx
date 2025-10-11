import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserOrders } from "../redux/slices/orderSlice";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="flex justify-between items-center border p-4 rounded">
              <p>Order ID: {order._id}</p>
              <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
              <Link
                to={`/orders/${order._id}`}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
