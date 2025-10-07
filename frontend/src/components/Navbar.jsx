import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopSmart
        </Link>
        <div className="space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
            Home
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
            Cart
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : "text-gray-700"}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
