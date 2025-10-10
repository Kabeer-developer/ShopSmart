import React from "react";
import { Routes, Route } from "react-router-dom";

// Part 2: Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Part 3: Product Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";

// Part 4: Cart & Orders Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Part 3: Products */}
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/admin/products" element={<AdminProducts />} />

      {/* Part 4: Cart & Orders */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />

      {/* Part 2: Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
