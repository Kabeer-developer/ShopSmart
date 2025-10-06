const express = require("express");
const router = express.Router();
const { addReview, getReviews } = require("../controllers/reviewController");
const { protect, admin } = require("../middleware/authMiddleware");

// Routes
router.post("/:id/reviews", protect, admin, addReview); // add review
router.get("/:id/reviews", getReviews);                // get reviews

module.exports = router;
