import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold">Total Users</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold">Total Sales</h2>
          <p className="text-2xl">${stats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold">Total Orders</h2>
          <p className="text-2xl">{stats.totalOrders}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="font-semibold">Top Product</h2>
          <p>{stats.topProduct?.name || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
