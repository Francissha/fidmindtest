import  MpesaTransaction from "./mpesa.model.js";
import axios from "axios"
import dotenv from "dotenv"

//const axios = require("axios");
//const dotenv = require("dotenv");

dotenv.config();

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const SHORTCODE = process.env.SHORTCODE;
const PASSKEY = process.env.PASSKEY;
const MPESA_BASE_URL = process.env.MPESA_BASE_URL || "https://sandbox.safaricom.co.ke";
const CALLBACK_URL = process.env.CALLBACK_URL;

const getAccessToken = async () => {
	try {
		const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");

		const response = await axios.get(
			`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
			{
				headers: {
					Authorization: `Basic ${auth}`,
				},
			}
		);

		return response.data.access_token;
	} catch (error) {
		console.error("Error fetching M-Pesa access token:", error.response?.data || error.message);
		throw new Error("Failed to get access token");
	}
};

export const orderBooks = async (req, res) => {
	const { phoneNumber, amount } = req.body;

	if (!phoneNumber || !amount) {
		return res.status(400).json({ error: "Phone number and amount are required" });
	}

	try {
		const accessToken = await getAccessToken();

		const timestamp = new Date()
			.toISOString()
			.replace(/[-T:]/g, "")
			.split(".")[0];

		const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString("base64");

		const stkPushPayload = {
			BusinessShortCode: SHORTCODE,
			Password: password,
			Timestamp: timestamp,
			TransactionType: "CustomerPayBillOnline",
			Amount: amount,
			PartyA: phoneNumber,
			PartyB: SHORTCODE,
			PhoneNumber: phoneNumber,
			CallBackURL: CALLBACK_URL,
			AccountReference: "BookStore",
			TransactionDesc: "Book Purchase",
		};

		const response = await axios.post(
			`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
			stkPushPayload,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);

		res.json(response.data);
	} catch (error) {
		console.error("STK Push Error:", error.response?.data || error.message);
		res.status(500).json({ error: "Failed to process STK Push" });
	}
};

export const stkCallback = async (req, res) => {
  try {
    console.log("STK Callback Received:", req.body);

    const { Body } = req.body;
    if (!Body || !Body.stkCallback || !Body.stkCallback.CheckoutRequestID) {
      return res.status(400).json({ success: false, message: "Invalid callback data" });
    }

    const { ResultCode, CheckoutRequestID, ResultDesc } = Body.stkCallback;

    // Find the transaction using the CheckoutRequestID
    const transaction = await MpesaTransaction.findOne({ checkoutRequestId: CheckoutRequestID });

    if (!transaction) {
        console.warn("Transaction not found for CheckoutRequestID:", CheckoutRequestID);
        return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Update status based on ResultCode
    transaction.status = ResultCode === 0 ? "SUCCESS" : "FAILED";
    transaction.resultCode = ResultCode;
    transaction.resultDesc = ResultDesc;
    transaction.responsePayload = Body;

    // If payment was successful, store additional details
    if (ResultCode === 0 && Body.stkCallback.CallbackMetadata) {
      transaction.paymentDetails = Body.stkCallback.CallbackMetadata;
    }

    // Save the updated transaction
    await transaction.save();

    return res.status(200).json({ success: true, message: "Transaction updated" });
  } catch (error) {
    console.error("STK Callback Error:", error.message);
    return res.status(500).json({ success: false, message: "Callback processing failed" });
  }
};

