import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUsers;
