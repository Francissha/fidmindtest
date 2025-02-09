const axios = require("axios");
const dotenv = require("dotenv");
const generateMpesaCredentials = require("../mpesaPayment/mpesaUtils");
const getAccessToken = require("../mpesaPayment/mpesaToken");

dotenv.config();

// Initiate C2B Payment
const initiateC2BPayment = async (req, res) => {
    try {
        const { phone, amount } = req.body;

        const accessToken = await getAccessToken();
        const { password, timestamp } = generateMpesaCredentials();

        const payload = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phone,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: "Checkout",
            TransactionDesc: "Payment for order"
        };

        const response = await axios.post(`${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.status(200).json({ message: "STK Push initiated", response: response.data });
    } catch (error) {
        console.error("Error initiating STK Push", error);
        res.status(500).json({ error: "Failed to initiate payment" });
    }
};

// Handle M-Pesa callback
const handleMpesaCallback = async (req, res) => {
    try {
        console.log("M-Pesa Callback Received:", JSON.stringify(req.body, null, 2));

        const { Body } = req.body;
        if (!Body || !Body.stkCallback) {
            return res.status(400).json({ message: "Invalid callback data" });
        }

        const { stkCallback } = Body;
        const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

        if (ResultCode === 0) {
            // Payment successful
            let transactionDetails = {};

            CallbackMetadata?.Item?.forEach(item => {
                transactionDetails[item.Name] = item.Value;
            });

            console.log("Transaction Details:", transactionDetails);

            res.status(200).json({ message: "Payment successful", transactionDetails });
        } else {
            // Payment failed
            console.log("Payment Failed:", ResultDesc);
            res.status(400).json({ message: "Payment failed", reason: ResultDesc });
        }

    } catch (error) {
        console.error("Error handling M-Pesa callback:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { initiateC2BPayment, handleMpesaCallback };
