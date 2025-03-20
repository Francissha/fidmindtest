import express from "express";
import { orderBooks, stkCallback } from "./mpesa.controller.js"; // Use `import` instead of `require`

const router = express.Router();

// Create order endpoint
router.post("/buyBook", orderBooks);
router.post("/callback", stkCallback)

export default router; // Export as default

