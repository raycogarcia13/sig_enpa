const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ErrorHandler = require("../utils/errorHandler");
const jwt = require('jsonwebtoken')
const User = require('../models/user')
// checks if authenticated
exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
    let { token } = req.cookies

    if(!token){
        token = req.headers.authorization
        if(!token)
            return next(new ErrorHandler('access.denied.token',401))
        
        token = token.replace(/^Bearer\s/, '');
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(decoded){
    req.user = decoded.user
    next()
    }
    else
        return next(new ErrorHandler('access.denied.token',401))
})

// checks if role auth
exports.authorizeRoles = (...roles) =>{
    return (req, res, next)=>{
        if(req.user.roles.includes('Administradores')){
            return next();
        }

        let allow = false;
        roles.forEach(element => {
            if(req.user.roles.includes(element))
                allow = true;
        });

        if(!allow)
            return next(new ErrorHandler(`User (${req.user.user}) is not alowed to access ti this resource`,403))
        
        return next();
    }
}