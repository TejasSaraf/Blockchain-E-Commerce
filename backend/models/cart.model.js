const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductData', required: true },
            quantity: { type: Number, default: 1 },
            //price: { type: Number, required: true }
            size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']}
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('Cart', cartSchema);