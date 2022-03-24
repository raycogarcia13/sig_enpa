const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const dataSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre del servicio es obligatorio']
    },
    description:{
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    
});

module.exports =  model('Service',dataSchema);