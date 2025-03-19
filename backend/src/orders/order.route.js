import express from 'express';
import { createAOrder, getOrderByEmail } from './order.controller.js'; // Ensure `.js` extension

const router = express.Router();

// Create order endpoint
router.post("/", createAOrder);

// User gets orders by email
router.get("/email/:email", getOrderByEmail);

export default router; // Ensure default export

