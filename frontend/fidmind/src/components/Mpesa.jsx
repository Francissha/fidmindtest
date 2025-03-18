import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Mpesa= ({ totalPrice, orderId }) => {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!phone.match(/^2547\d{8}$/)) {
            Swal.fire("Invalid Phone Number", "Enter a valid Safaricom number (2547XXXXXXXX)", "warning");
            return;
        }
        

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/mpesa/buyBook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: phone, amount: parseFloat(totalPrice), orderId })
            });

            const result = await response.json();

            if (result.success) {
                Swal.fire({
                    title: "M-Pesa Payment",
                    text: "Enter your M-Pesa PIN on your phone to complete the payment",
                    icon: "success",
                    confirmButtonText: "Okay"
                });
                navigate("/orders");
            } else {
                throw new Error(result.error || "Payment failed");
            }
        } catch (error) {
            Swal.fire("Payment Failed", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">M-Pesa Payment</h2>
                <p className="text-gray-700 text-center mb-4">Total: <strong>KES {totalPrice}</strong></p>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter M-Pesa Number (2547XXXXXXXX)"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700 disabled:bg-gray-400"
                >
                    {loading ? "Processing..." : "Pay with M-Pesa"}
                </button>
            </div>
        </div>
    );
};


export default Mpesa;


