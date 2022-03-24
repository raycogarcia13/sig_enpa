const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// create and send JWT in cookie
const sendToken = (user, res)=>{

    //create a JWT 
    const token =jwt.sign({user},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRESTIME});

    // options cookie  
    const options = {
        expires: new Date(
            Date.now()+ process.env.COOKIE_EXPIRES_TIME * 24 * 60* 60* 1000
        ),
        httpOnly: true
    }

    res.cookie('token',token, options).json({
        status:'success',
        user,
        token
    })
}

module.exports = sendToken;