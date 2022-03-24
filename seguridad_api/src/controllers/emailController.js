const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const {sendMail} = require('../utils/mail')
const asyncForEach = require('../utils/asyncForEach')

exports.sendEmail =  catchAsyncErrors(async (req,res,next) =>{
    const {destinys, message, topic} = req.body;
    
    await sendMail(destinys,message,message, topic);
    
    return res.json({
        status:"success",
        message:"email.sended"
    })
});
   