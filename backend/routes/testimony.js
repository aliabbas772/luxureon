const express = require("express");
const { createTestimony, getAllTestimonies, getUserTestimonies, deleteTestimony,  } = require("../controllers/testimonyController");
const auth = require("../middleware/auth");
const cors = require('cors');
const router = express.Router();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

// Public route for customers to create a testimony
router.post("/", auth, createTestimony);

// Admin route to get all testimonies
router.get("/",  getAllTestimonies);




// Admin route to get specific user testimonies
router.get("/user/:id", auth, getUserTestimonies);

// Admin route to delete a testimony
router.delete("/:id", auth, deleteTestimony);

module.exports = router;