const Order = require("./order.model");

const createAOrder = async(req, res) =>{
    try {
        const newOrder = await Order(req.body);
        const saveOrder=await newOrder.save();
        res.status(200).json (saveOrder);
    } catch (error) {
        console.error("Error creating order", error)
         res.status(500).json({message: "Failed to create order"});
    }
};

const getOrderByEmail = async(req, res) =>{
    try {
       const {email} =req.params;
       const orders = await Order.find({email}).sort({createdAt: -1});
     
       if (orders.length === 0) {
    return res.status(404).json({ message: "Order not found" });
}

       res.status(200).json(orders);
    } catch (error) {
        console.error("Error getting orders by email", error)
        res.status(500).json({message: "Failed to get orders by email"});
    }
}
module.exports ={
    createAOrder,
    getOrderByEmail
}
