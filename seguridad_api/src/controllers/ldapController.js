const User = require('../models/user');
const Projector = require('../models/projector');
const Leader = require('../models/leaders');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const { sendMail, messageRegister } = require('../utils/mail')

const asyncForEach = require('../utils/asyncForEach')

const ActiveDirectory = require('activedirectory');
const config = {
    url: process.env.LDAP_URI,
    baseDN: process.env.LDAP_DN,
    username:process.env.LDAP_USER,
    password:process.env.LDAP_PASS
};


// refresh user => /api/v1/refreshUser
exports.refreshLeader =  catchAsyncErrors(async (req,res,next) =>{
    const ad = new ActiveDirectory(config);
    return ad.getUsersForGroup('CTJefe', async (err, users)=> {
        asyncForEach(users,async(item)=>{
            const p =await Leader.findOne({username:item.sAMAccountName});
            if(!p){
                await Leader.create({
                    name:item.cn,
                    username:item.sAMAccountName
                })
            }
        })
        const all = await Leader.find();
    
        return res.json(all)
    });
});
   
// refresh user => /api/v1/refreshUser
exports.getUsers =  catchAsyncErrors(async (req,res,next) =>{
    const ad = new ActiveDirectory(config);
    return ad.getUsersForGroup({attributes:'*'},'CTProyectista', async (err, users)=> {
        return res.json(users)
    });
});
   