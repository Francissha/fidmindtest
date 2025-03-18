const { mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: {
        city: { type: String, required: true },
        country: String,
        district: String,
        zipcode: String,
    },
    phone: { type: String, required: true },
    products: [  
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            title: String,
            quantity: Number,
            price: Number,
        }
    ],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
