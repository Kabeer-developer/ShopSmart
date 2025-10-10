import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">E-Commerce</Link>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>

        {!user ? (
          <>
            <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
            <li><Link to="/register" className="hover:text-gray-300">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" className="hover:text-gray-300">{user.name}</Link></li>

            {/* Admin link for Part 3 */}
            {user.role === "admin" && (
              <li><Link to="/admin/products" className="hover:text-gray-300">Admin Products</Link></li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 bg-red-500 px-2 py-1 rounded"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
