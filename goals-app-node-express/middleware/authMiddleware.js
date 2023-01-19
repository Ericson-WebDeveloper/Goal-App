const jwt = require('jsonwebtoken');
const User = require('../model/User');
const asyncHandler = require('express-async-handler');


const protect = asyncHandler(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token =  req.headers.authorization.split(' ')[1];
            if(token) {
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                let user = await User.findOne({_id: decoded.id}).select('-password');
                if(!user) {
                    res.status(401)
                    throw new Error(`User Not Found.`)
                }
                req.user = user;
                next();
            } else {
                res.status(401)
                    throw new Error(`You dont have token authorization.`)
            }
        } catch (error) {
            res.status(401)
                throw new Error(`You dont have token authorization.`)
        }
    } else {
        res.status(401)
        throw new Error(`You dont have authorization.`)
    }
})

module.exports = {
    protect
}