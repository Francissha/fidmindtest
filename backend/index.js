const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://xyztest-1.onrender.com', 'http://localhost:5173'], // Add frontend URL
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');
const mpesaRoutes = require("./mpesaPayment/mpesaRoute");

// Use Routes
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/mpesa", mpesaRoutes);

// Serve Static Files (Images)
app.use('/uploads', express.static('uploads')); // Ensure image storage path is correct

// Default Route
app.get("/", (req, res) => {
  res.send("Book Store Server is running!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
