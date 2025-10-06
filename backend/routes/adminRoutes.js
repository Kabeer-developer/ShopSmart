const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, getStats } = require("../controllers/adminController");
const  { protect, admin } = require("../middleware/authMiddleware");

// Admin routes
router.get("/users", protect, admin,getAllUsers);       // get all users
router.delete("/users/:id", protect, admin, deleteUser); // delete user
router.get("/stats", protect, admin, getStats);          // sales stats

module.exports = router;
