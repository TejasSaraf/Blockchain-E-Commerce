const Contact = require('../models/contactModel')
const express = require('express')
const router = express.Router();

router.post('/contact-us', async (req, res) => {
    try {
        const user = await Contact.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

module.exports = router;