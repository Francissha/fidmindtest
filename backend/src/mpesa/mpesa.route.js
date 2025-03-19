import express from "express";
import { orderBooks } from "./mpesa.controller.js"; // Use `import` instead of `require`

const router = express.Router();

// Create order endpoint
router.post("/buyBook", orderBooks);

export default router; // Export as default

