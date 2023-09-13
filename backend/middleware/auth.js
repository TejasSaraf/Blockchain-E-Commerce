const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" });
        const verified = jwt.verify(token, "alksdjlskjfskldfjsdlkjfs");
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        req.user = verified.id;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = auth;
