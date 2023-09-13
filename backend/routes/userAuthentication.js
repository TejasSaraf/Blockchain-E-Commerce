
const jwt = require('jsonwebtoken')
const brcrypt = require('bcryptjs')
const User = require('../models/user.model')
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const cw = require("crypto-wallets")

router.post('/register', async (req, res) => {
    try {
        const wallet = cw.generateWallet("ETH");
        const hashedPassword = await brcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: hashedPassword,
            isAdmin: req.body.isAdmin ? true : false,
            wallet: {
                currency: wallet.currency,
                privateKey: wallet.privateKey,
                address: wallet.address
            },
        })
        res.json({ status: 'ok' })
        console.log(user)
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        
        const isAdmin = user.isAdmin ? true : false ;

        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User does not exists with this email Id' })
        }
        const isValidPassword = await brcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            //sign JWT Token
            const token = jwt.sign(
                {
                    id: user._id
                }
                , "alksdjlskjfskldfjsdlkjfs" )
            if (isAdmin) {
                return res.json({ status: 'ok', user: token, isAdmin: isAdmin })
            } else {
                return res.json({ status: 'ok', user: token })
            }
        }
        else {
            return res.json({ status: 'error', message: "Password does not match" })
        }
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    });
});

module.exports = router;