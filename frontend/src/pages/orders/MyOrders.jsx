import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyOrders } from "../../features/orders/ordersSlice";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Total</th>
                <th className="text-left px-4 py-2">Paid</th>
                <th className="text-left px-4 py-2">Delivered</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id.slice(-6)}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">{order.isPaid ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">{order.isDelivered ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
