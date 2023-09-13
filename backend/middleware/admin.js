const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).json({ msg: "No authentication token, access denied" });
        const verified = jwt.verify(token, "alksdjlskjfskldfjsdlkjfs");
        if (!verified)
            return res.status(401).json({ msg: "Token verification failed, authorization denied" });
        req.user = verified.id;
        await User.findById(req.user).then((user) => {
            if (user.isAdmin) {
                next();
            } else {
                return res.status(401).json({ msg: "Unauthorized to access the data, Unprevilleged user" })
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = isAdmin;