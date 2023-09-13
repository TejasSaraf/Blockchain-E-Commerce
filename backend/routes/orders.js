const Orders = require('../models/orders.model')
const Cart = require('../models/cart.model')
const express = require('express')
const router = express.Router();
const Web3 = require("web3")
const User = require('../models/user.model')

async function cartItems(id) {
    const cart = await Cart.findOne({ user: id })
    return cart.cartItems
}

let transactionHash;

function saveHash(hash) {
    transactionHash = hash
}

function sendETH(fromAddress, toAddress, privateKey, amount, req, res) {

    // Connect to an Ethereum node
    const web3 = new Web3('http://127.0.0.1:8545')
    let transactionHash;
    // Create transaction object
    let transaction = {
        from: fromAddress,
        to: toAddress,
        gas: web3.utils.toHex(21000),
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether"))
    }

    // Sign the transaction
    const signTx = new Promise((resolve, reject) => {
        resolve(web3.eth.accounts.signTransaction(transaction, privateKey))
    }).then(signedTx => {
        // Send the transaction
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, async (error, hash) => {
            if (!error) {
                try {
                    // if the cart is empty
                    let cartItem = await cartItems(req.user)
                    if (cartItem.length == 0) {
                        res.json({ status: 'ok', message: "Order cannot be placed for empty cart" })
                        return
                    }
                    const user = await User.findById(req.user);
                    const transactionHash = hash
                    let order = await Orders.findOne({ orderPlacedBy: req.user })
                    if (order) {

                        // if first order placed by new user then create new record for the new user
                        order = await Orders.findOneAndUpdate({ orderPlacedBy: req.user }, {
                            $push: {
                                orders: {
                                    cartItems: await cartItems(req.user),
                                    orderTotal: req.body.amount,
                                    paymentMode: req.body.paymentMode,
                                    paymentReference: transactionHash,
                                    deliveryAgency: "indian post services",
                                    transactionHash: transactionHash
                                }
                            }
                        })
                    } else {
                        // if user already have an record for current user Id then push the order into orders array
                        order = await Orders.create({
                            orderPlacedBy: req.user,
                            orders: {
                                cartItems: await cartItems(req.user),
                                orderTotal: req.body.amount,
                                paymentMode: req.body.paymentMode,
                                paymentReference: transactionHash,
                                deliveryAgency: "indian post services",
                                transactionHash: transactionHash
                            }
                        })
                    }
                    order.save(async () => {
                        // empty the cart once the order is placed
                        await Cart.findOneAndUpdate({ user: req.user }, {
                            $set: {
                                cartItems: [],
                            }
                        })
                    })
                    const data = await Orders.find({ orderPlacedBy: req.user }).populate("orders.cartItems.product")
                    res.json({ status: 'ok', data: data, transactionHash: transactionHash })

                } catch (error) {
                    res.json({ status: 'error', error: error })
                }
            }
            else {
                res.json({ status: 'error', error: error })
            }
        })
    })
}

router.post('/', async (req, res) => {
    // get the list of orders placed logged in user
    try {
        // call the send Ether function so that for the successfull payments order will be placed
        sendETH("0x563CE30744D8b5b417F4E17831D2A95Bb51C3114", "0x15A4534362daeFfC2b4E6fEcdFC41b78158BFBBE", "0x2123a22ed1fcacc594a8f19db2ade87951d9ceb1e9fe87da1f9a8e87214657e6", req.body.amount, req, res)

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.get('/', async (req, res) => {
    // get the list of orders placed logged in user
    try {
        const order = await Orders.findOne({ orderPlacedBy: req.user })
        if (order) {
            const data = await Orders.findOne({ orderPlacedBy: req.user }).populate("orders.cartItems.product")
            res.json({ status: 'ok', data: data.orders })
        } else {
            res.json({ status: 'error', data: [], message: "No orders found for relative user" })
        }
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.get('/get/balance', async (req, res) => {
    // get the list of orders placed logged in user
    try {
        const web3 = new Web3("http://127.0.0.1:8545")
        const user = await User.findById(req.user);
        const balance = await web3.eth.getBalance('0x563CE30744D8b5b417F4E17831D2A95Bb51C3114')
        const ether = await web3.utils.fromWei(balance, 'ether')
        res.json({ status: 'ok', balance: ether })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.get('/get/balance/admin', async (req, res) => {
    // get the list of orders placed logged in user
    try {
        const web3 = new Web3("http://127.0.0.1:8545")
        const user = await User.findById(req.user);
        const balance = await web3.eth.getBalance('0x15A4534362daeFfC2b4E6fEcdFC41b78158BFBBE')
        const ether = await web3.utils.fromWei(balance, 'ether')
        res.json({ status: 'ok', balance: ether })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

module.exports = router;