const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    orderPlacedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
    orders: [
        {

            cartItems: [
                {
                    product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductData', required: true },
                    quantity: { type: Number, default: 1 },
                    //price: { type: Number, required: true }
                }
            ],
            orderTotal: { type: Number, required: true },
            paymentMode: { type: String, required: true },
            paymentReference: { type: String },
            paidStatus: { type: Boolean, default: false },
            orderDelivered: { type: Boolean, default: false },
            deliveryAgency: { type: String, required: true },
            transactionHash: { type: String, required: true }
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Orders', ordersSchema);