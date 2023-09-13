const User = require('../models/user.model')
const Token = require("../models/user.forgot-passord-token");
const brcrypt = require('bcryptjs')
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `http://localhost:5000/password-reset/${user._id}/${token.token}`;
        console.log(link)
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/changepassword/:id/token/:token", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        // add one more validation to check new password and confirm password
        if (!token) return res.status(400).send("Invalid link or expired");
        const hashedPassword = await brcrypt.hash(req.body.password,10);
        user.password = hashedPassword;
        await user.save();
        await token.delete();

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;
