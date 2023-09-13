const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    productName: { type: 'String', required: true },
    description: { type: 'String' },
    slug: { type: 'String', required: true, unique: true },
    price: { type: 'Number', required: true },
    images: [{
        type: String
    }],
    technicalFeatures: [{ type: String }],
    category: [{ type: String }],
    sizes: [{
        type: Number,
        default: [ 0, 0, 0, 0, 0, 0]
    }],
    gender: {
        type: String,
        enum: ['M','F'],
        required: true
    },
    kids:{
        type: Boolean,
        default: false
    }
    // [ xs, S, M, L, XL, XXL ] if we have only medium and XL available then the array would be like [ 0, 0, 1, 0, 1, 0]
},
    {
        collection: 'products-data'
    }
)

const model = mongoose.model('ProductData', ProductSchema)

module.exports = model