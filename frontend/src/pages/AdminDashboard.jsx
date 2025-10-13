import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../redux/slices/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders || 0}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded text-center">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">₹{stats.totalRevenue || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
