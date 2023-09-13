const Products = require('../models/product.model')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await Products.find()
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.get('/:slug', async (req, res) => {
    // get the single product and relative products
    try {
        const data = await Products.findOne({ slug: req.params.slug })
        const relatedProducts = await Products.find({ gender: data.gender, category: data.category, kids: data.kids })
        const filteredRelatedProducts = relatedProducts.filter((product) => {
            return product.slug != data.slug
        })
        res.json({ status: 'ok', data: data, relatedProducts: filteredRelatedProducts })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.post('/search', async (req, res) => {
    // get the single product and relative products
    try {
        const searchRegex = new RegExp(req.body.query, 'i')
        const data = await Products.find({ productName: { $regex: searchRegex } } )
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error })
    }
})

router.get('/explore/:gender/:category', async (req, res) => {
    // get the list of products in the explore page
    let gender, isKids = false;
    switch (req.params.gender) {
        case 'men':
            gender = 'M'
            break;
        case 'women':
            gender = 'F'
            break;
        case 'kids':
            isKids = true;
            break;
    }
    try {
        const data = await Products.find({ kids: isKids, gender: gender, category: req.params.category })
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.get('/explore/:gender/', async (req, res) => {
    // get the list of products in the explore page
    let gender, isKids = false;
    switch (req.params.gender) {
        case 'men':
            gender = 'M'
            break;
        case 'women':
            gender = 'F'
            break;
        case 'kids':
            isKids = true;
            break;
    }
    try {
        const data = await Products.find({ kids: isKids, gender: gender })
        res.json({ status: 'ok', data: data })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

module.exports = router;