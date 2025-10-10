import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, clearOrderDetails } from "../redux/slices/orderSlice";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading } = useSelector((state) => state.orders);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOrderById(id));

    return () => {
      dispatch(clearOrderDetails());
    };
  }, [dispatch, id]);

  if (loading || !orderDetails) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 border p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <p>Order ID: {orderDetails._id}</p>
      <p>Total Price: ${orderDetails.totalPrice.toFixed(2)}</p>
      <h3 className="font-bold mt-4">Items:</h3>
      <ul className="list-disc list-inside">
        {orderDetails.orderItems.map((item) => (
          <li key={item._id}>
            {item.name} x {item.qty} = ${item.price * item.qty}
          </li>
        ))}
      </ul>
      <Link to="/orders" className="text-blue-600 hover:underline mt-4 inline-block">
        Back to Orders
      </Link>
    </div>
  );
};

export default OrderDetails;
