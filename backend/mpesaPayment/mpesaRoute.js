const express = require("express");
const { initiateC2BPayment, handleMpesaCallback } = require("../mpesaPayment/mpesaController");

const router = express.Router();

router.post("/stkpush", initiateC2BPayment);
router.post("/callback", handleMpesaCallback);

module.exports = router;
