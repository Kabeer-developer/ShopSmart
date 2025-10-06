const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin }= require("../middleware/authMiddleware");

// Routes
router.post("/", protect, admin,createProduct);       // admin only
router.get("/", getProducts);                           // all users
router.get("/:id", getProductById);
router.put("/:id", protect, admin,updateProduct);     // admin only
router.delete("/:id", protect, admin, deleteProduct);  // admin only

module.exports = router;
