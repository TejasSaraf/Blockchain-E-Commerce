require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const products = require("./routes/products");
const cart = require("./routes/cart");
const orders = require("./routes/orders");
const passwordReset = require("./routes/forgot-password");
const userAuthentication = require("./routes/userAuthentication");
const Contact = require("./routes/contact")
const auth = require("./middleware/auth");
const admin = require("./routes/admin")
const isAdmin = require('./middleware/admin')
const bodyParser = require("body-parser");

// middlewares
app.use(cors())
app.use(express.json())
// body parser which checks for the header and treat the body like an json object else server treat it as a plain string
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// used for the multer to upload the product images for the carousel
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

//mongoDb database connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/e-commerce-DApp', { useNewUrlParser: true })

app.listen(5000, () => {
    console.log('Server started')
    console.log(mongoose.connection.readyState);
})

app.use("/api/password-reset", passwordReset);
app.use("/api", userAuthentication);
app.use("/api/products", products);
app.use("/api/cart", auth, cart);
app.use("/api/orders", auth, orders);
app.use("/api", Contact)

// admin routes
app.use("/admin", [auth, isAdmin], admin)
