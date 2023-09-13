const mongoose = require('mongoose')

const Contact = new mongoose.Schema({
    name: { type: 'String', required: true },
    email: { type: 'String', required: true },
    phone: { type: 'Number', required: true },
    message: { type: 'String', },
}, 
{
    collection: 'Contact-us'
}
)

const ContactUs = mongoose.model('ContactUs',Contact)

module.exports = ContactUs
