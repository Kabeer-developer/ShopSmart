import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        E-Commerce
      </Link>

      {/* Links */}
      <ul className="flex space-x-4 items-center">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-300">
            Cart
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            {/* User */}
            <li>
              <Link to="/profile" className="hover:text-gray-300">
                {user.name}
              </Link>
            </li>

            {/* ✅ Admin Dropdown */}
            {user.role === "admin" && (
              <li className="relative">
                <button
                  onClick={() => setShowAdminMenu((prev) => !prev)}
                  className="hover:text-yellow-400"
                >
                  Admin ▾
                </button>

                {showAdminMenu && (
                  <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-52 z-50">
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/users"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Manage Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/products"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Manage Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orders"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/stats"
                        className="block px-4 py-2 hover:bg-gray-200"
                        onClick={() => setShowAdminMenu(false)}
                      >
                        Revenue / Stats
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Logout */}
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
