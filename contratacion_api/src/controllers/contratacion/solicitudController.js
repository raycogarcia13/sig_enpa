const Solicitud = require('../../models/solicitud');
const Client = require('../../models/client');
const Service = require('../../models/service');
const ErrorHandler = require("../../utils/errorHandler");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors")
const asyncForEach = require('../../utils/asyncForEach')


//GET all services => /contratacion_api/api/v1/services
exports.all =  catchAsyncErrors(async (req,res,next) =>{
   
    const data = await Solicitud.find()
    .populate('client')
    .populate('service');

    return res.json({
        status:"success",
        data
    })
});

//GET all services => /contratacion_api/api/v1/services
exports.nomenclators =  catchAsyncErrors(async (req,res,next) =>{
   
    const ser = await Service.find();
    const clie = await Client.find();

    return res.json({
        status:"success",
        data:{
            services:ser,
            clients:clie
        }
    })
});
   
//GET get services => /contratacion_api/api/v1/services/:id
exports.get =  catchAsyncErrors(async (req,res,next) =>{
   const {id} = req.params;

    const data = await Solicitud.findById(id);

    return res.json({
        status:"success",
        data
    })
});
   
//POST create services => /contratacion_api/api/v1/services
exports.store =  catchAsyncErrors(async (req,res,next) =>{

    const data = await Solicitud.create(req.body);

    return res.json({
        status:"success",
        data
    })
});


//PUT update service by id : /contratacion_api/api/v1/services/:id 
exports.update = catchAsyncErrors(async (req,res,next) =>{
    const {id} = req.params;
    let data = await Solicitud.findById(id);

    if(!data)
        return next(new ErrorHandler('Solicitud not found',404))   

    data = await Service.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });

    res.json({
        status:"success",
        message:"Solicitud.updated",
        data
    })
})

//DELETE remove one service by id : /contratacion_api/api/v1/services/:id 
exports.remove = catchAsyncErrors(async (req,res,next) =>{
    let data = await Solicitud.findById({_id:req.params.id});
    
    if(!data){
        return next(new ErrorHandler('Solicitud not found',404)) 
    }
    
    data = await Solicitud.findByIdAndRemove(req.params.id);

    res.json({
        status:"success",
        message:"Solicitud.deleted",
        data
    })
})

   