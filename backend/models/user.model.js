const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: 'String', required: true },
    phoneNo: { type: 'String', required: true },
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    isAdmin: { type: 'Boolean', default: false },
    wallet: {
        currency: {
            type: 'String', required: true
        },
        privateKey: {
            type: 'String', required: true
        },
        address: {
            type: 'String', required: true
        }
    }
},
    {
        collection: 'user-data'
    }
)

const model = mongoose.model('UserData', User)

module.exports = model