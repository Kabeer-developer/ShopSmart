import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderById } from "../../features/orders/ordersSlice";
import Loader from "../../components/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        order && (
          <div className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Order {order._id}</h1>

            <div className="mb-4">
              <h2 className="font-semibold">Shipping Address</h2>
              <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold">Order Items</h2>
              {order.orderItems.map((item) => (
                <div key={item.product} className="flex justify-between py-1 border-b">
                  <p>{item.name} x {item.qty}</p>
                  <p>${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="mb-4 font-semibold text-lg">
              Total Price: ${order.totalPrice.toFixed(2)}
            </div>

            <div className="mb-4">
              <p>Paid: {order.isPaid ? "Yes" : "No"}</p>
              <p>Delivered: {order.isDelivered ? "Yes" : "No"}</p>
            </div>

            <Link
              to="/orders"
              className="text-blue-600 hover:text-blue-800"
            >
              Back to Orders
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default OrderDetails;
