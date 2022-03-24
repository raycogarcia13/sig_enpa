exports.success = (req,res,status,data,msg)=>{
    return res.status(status).json({
        msg,
        data
    })
}