import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStats } from "../redux/slices/adminSlice";

const AdminStats = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Revenue / Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2>Total Users</h2>
          <p className="text-xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2>Total Orders</h2>
          <p className="text-xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2>Total Sales</h2>
          <p className="text-xl font-bold">${stats.totalSales}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow">
          <h2>Top Products</h2>
          <ul>
            {stats.topProducts?.map((p) => (
              <li key={p._id}>{p.name} - ${p.price}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
