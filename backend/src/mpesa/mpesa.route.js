const express = require("express");
const { orderBooks } = require("./mpesa.controller.js");

const router = express.Router();

// Create order endpoint
router.post("/buyBook", orderBooks);

module.exports = router;