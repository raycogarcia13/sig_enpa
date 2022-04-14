const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")

const asyncForEach = require('../utils/asyncForEach')

const ActiveDirectory = require('activedirectory');
const config = {
    url: process.env.LDAP_URI,
    baseDN: process.env.LDAP_DN,
    username:process.env.LDAP_USER,
    password:process.env.LDAP_PASS
};

exports.login =  catchAsyncErrors(async (req,res,next) =>{
    const {username, password} = req.body;
    
    if(!username || !password)
        return next(new ErrorHandler('auth.empty',400))
    
    const ad = new ActiveDirectory(config);
    // Authenticate
    return ad.authenticate(`${username}${process.env.LDAP_DOMAIN}`, password,function(err, auth) {
        if (err)
            return next(new ErrorHandler('auth.error',401))

        if (auth) {
            ad.findUser({
                includeMembership: [ 'all' ],
                // attributes:'*'
            },`${username}${process.env.LDAP_DOMAIN}`,async function(err, data) {
                // let roles=[];
                const roles = data.groups.map(item=>item.cn)
                // const projector = await Projector.findOne({username:data.sAMAccountName});

                const user = {
                    user:data.sAMAccountName,
                    email:data.userPrincipalName,
                    name:data.displayName,
                    // projector,
                    roles,
                }
                return sendToken(user, res);
            });
            
        }
        else 
            return next(new ErrorHandler('auth.error',401))
    });
})

exports.login2 =  catchAsyncErrors(async (req,res,next) =>{
    const {username, password} = req.body;
    
    if(!username || !password)
        return next(new ErrorHandler('auth.error',400))
    
    const roles = ['CTJefe'];

    const user = {
        user:username,
        email:'desarrollo@enpa.iju.minag.cu',
        name:'Rayco García Fernández',
        roles,
    }
    return sendToken(user, res);
})


// logout user => /api/v1/logout
exports.logout =  catchAsyncErrors(async (req,res,next) =>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.json({
        status:'success',
        message: 'logged.out'
    })
})

// refresh user => /api/v1/refreshUser
exports.refreshUser =  catchAsyncErrors(async (req,res,next) =>{
    const ad = new ActiveDirectory(config);
    return ad.getUsersForGroup('CTProyectista', async (err, users)=> {
           asyncForEach(users,async(item)=>{
               const p =await Projector.findOne({username:item.sAMAccountName});
               if(!p){
                   await Projector.create({
                       name:item.cn,
                       username:item.sAMAccountName
                   })
               }
           })
           const all = await Projector.find();
       
           return res.json(all)
       });
   });
   