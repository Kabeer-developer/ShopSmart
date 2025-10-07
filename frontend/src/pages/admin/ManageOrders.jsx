import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Delivered</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order._id}</td>
                <td className="px-4 py-2">{order.user.name}</td>
                <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2">{order.isPaid ? "Yes" : "No"}</td>
                <td className="px-4 py-2">{order.isDelivered ? "Yes" : "No"}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/orders/${order._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOrders;
