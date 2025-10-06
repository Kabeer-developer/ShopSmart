const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

// Routes
router.post("/", protect, admin,createOrder);          // create order
router.get("/myorders", protect, admin, getMyOrders);  // user orders
router.get("/", protect, admin,getAllOrders);         // admin: all orders
router.put("/:id/status", protect, admin, updateOrderStatus); // admin updates

module.exports = router;
