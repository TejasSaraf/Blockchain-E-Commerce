const express = require('express')
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Products = require('../models/product.model')
const Orders = require('../models/orders.model')
const User = require('../models/user.model')

// Creating uploads folder if not already present
// In "uploads" folder we will temporarily upload
// image before uploading to cloudinary
if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

// Multer setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: "dkdovv1mp",
    api_key: "689329276849189",
    api_secret: "NAySxZhmVYt9l8veK_SXshI-HCU",
});

async function uploadToCloudinary(locaFilePath) {

    // locaFilePath: path of image which was just
    // uploaded to "uploads" folder

    var mainFolderName = "main";
    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;

    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {

            // Image has been successfully uploaded on
            // cloudinary So we dont need local image 
            // file anymore
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {

            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { message: "Fail" };
        });
}

async function checkIfSlugExist(slug) {
    try {
        const product = await Products.findOne({ slug: slug })
        if (product == null) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

function generateSlugFromTitle(title) {
    return title.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
}

async function generateSlug(title) {

    let slug = generateSlugFromTitle(title)
    let count = 0;
    let isExist;
    do {
        isExist = await checkIfSlugExist(slug)
        if (isExist) {
            slug = generateSlugFromTitle(title) + "-" + count.toString();
            count++;
        } else {
            return slug;
        }
    } while (isExist)
}

// routes for the admin Product related CRUD operations

router.get('/', async (req, res) => {
    // get the list of cart Items
    try {
        res.json({ status: 'ok', msg: "Hello admin" })
    } catch (error) {
        res.json({ status: 'error', error: error })
    }
})

router.post('/product/create', upload.array("product-images", 12), async (req, res) => {
    let imageUrlList = [];
    if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
            let locaFilePath = req.files[i].path;

            // Upload the local image to Cloudinary
            // and get image url as response
            let result = await uploadToCloudinary(locaFilePath);
            imageUrlList.push(result.url);
        }
    }
    try {

        // filter to make all the categories lowercase before adding
        let categories = []
        JSON.parse(req.body.category).map((category) => {
            categories.push(category.toLowerCase())
        })

        const product = await Products.create({
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            slug: await generateSlug(req.body.productName),
            images: imageUrlList,
            category: categories,
            technicalFeatures: JSON.parse(req.body.technicalFeatures),
            sizes: JSON.parse(req.body.sizes),
            gender: req.body.gender,
            kids: req.body.kids
        })
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

router.patch('/product/update/:slug', upload.array("product-images", 12), async (req, res) => {
    try {
        const updatedBody = req.body;
        let imageUrlList = [];

        if (req.files) {
            for (var i = 0; i < req.files.length; i++) {
                var locaFilePath = req.files[i].path;

                // Upload the local image to Cloudinary
                // and get image url as response
                var result = await uploadToCloudinary(locaFilePath);
                imageUrlList.push(result.url);
            }
        }
        updatedBody.images = imageUrlList;
        // update the slug according to the new product name 
        if (req.body.productName) {
            updatedBody.slug = await generateSlug(req.body.productName)
        }
        const data = await Products.findOneAndUpdate({ slug: req.params.slug }, updatedBody)
        res.json({ status: 'ok', message: 'product updated successfully' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error.message })
    }
})

router.delete('/product/delete/:slug', async (req, res) => {
    try {
        const data = await Products.findOneAndDelete({ slug: req.params.slug })
        res.json({ status: 'ok', message: 'product Deleted successfully' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
})

// routes for the placed orders

router.get('/orders', async (req, res) => {
    // get the list of orders placed by all users Items
    try {
        const data = await Orders.find({}).populate("orders.cartItems.product").populate("orderPlacedBy")
        let filteredOrders = data.map((order) => {
            return{
                id: order._id,
                orderPlacedBy: {
                    email: order.orderPlacedBy.email,
                    name: order.orderPlacedBy.name,
                    phoneNo: order.orderPlacedBy.phoneNo
                },
                orders: order.orders,
            }
        })
        res.json({ status: 'ok', data: filteredOrders })
    } catch (error) {
        res.json({ status: 'error', error: error })
    }
})

// routes for the admin to get users

router.get('/users', async (req, res) => {
    try {
        const user = await User.find();
        let filteredUser = user.map((user) => {
            return{
                id: user._id,
                email: user.email,
                name: user.name,
                phoneNo: user.phoneNo,
                isAdmin: user.isAdmin
            }
        })
        res.json({ status: 'ok', data: filteredUser })
    } catch (error) {
        res.json({ status: 'error', error: error })
    }
})

router.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find();
        const orders = await Orders.find();
        const products = await Products.find();

        res.json({ status: 'ok', data: {
            users : users.length,
            orders: orders.length,
            products: products.length
        }})

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: error.message })
    }
})
module.exports = router;