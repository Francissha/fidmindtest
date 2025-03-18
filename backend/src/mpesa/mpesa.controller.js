
const axios = require("axios");
const dotenv = require("dotenv");

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

const orderBooks = async (req, res) => {
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

module.exports = { orderBooks };
