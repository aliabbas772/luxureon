const express = require("express");
const { login, signup, userDetails, viewAllUsers, resetPassword } = require("../controllers/userController");
const auth = require("../middleware/auth");
const cors = require('cors');
const router = express.Router();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

// Public Routes
router.post("/register", signup);
router.post("/login", login);
router.post("/reset-password", resetPassword);


// Protected Routes
router.get("/me", auth, userDetails);
router.get("/all", auth, viewAllUsers);

module.exports = router;
