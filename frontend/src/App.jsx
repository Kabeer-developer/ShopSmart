import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import Home from "./pages/products/Home";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/cart/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/auth/Profile";
import MyOrders from "./pages/orders/MyOrders";

// Admin Pages
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOrders from "./pages/admin/ManageOrders";
import Dashboard from "./pages/admin/Dashboard";

// Misc Pages
import NotFound from "./pages/misc/NotFound";
import Unauthorized from "./pages/misc/Unauthorized";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Navbar cartCount={cartItems.length} userInfo={userInfo} />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>

          {/* Misc / Fallback */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
