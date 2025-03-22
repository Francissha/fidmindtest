import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bookRoutes from "./src/books/book.route.js";
import orderRoutes from "./src/orders/order.route.js";
import userRoutes from "./src/users/user.route.js";
import adminRoutes from "./src/stats/admin.stats.js";
import mpesaRoutes from "./src/mpesa/mpesa.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://xyztest-1.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mpesa", mpesaRoutes);

// Serve Static Files (Images)
app.use("/uploads", express.static("uploads"));

// Default Route
app.get("/", (req, res) => {
  res.send("Book Store Server is running!");
});

app.post('/callback', (req, res) => {
  const callbackData = req.body;

  // Log the callback data to the console
  console.log(callbackData);

  // Send a response back to the M-Pesa
  res.json({ status: 'success' });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

