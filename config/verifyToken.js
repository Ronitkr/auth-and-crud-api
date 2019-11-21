const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(400).send('Access Denied');

    try{
        const verified = jwt.verify(token, config.secrete);
        req.user = verified;
        next();
    }catch (err) {
        res.status(400).send('Invalid Token');
    }
};