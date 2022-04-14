const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const dataSchema = new Schema({
    name:{
        type: String,
        required: [true, 'El nombre del cliente es obligatoria']
    },
    organismo:{
        type: String,
        required: [true, 'El organismo es obligatorio']
    },
    phone:{
        type: String,
        required: [true, 'El teléfono obligatorio']
    },
    address:{
        type: String,
        required: [true, 'La dirección obligatorio']
    },
    account_cup:{
        type: String,
        required: [true, 'La cuenta es obligatoria']
    },
    reeup:{
        type: String,
        required: [true, 'El código reeup es obligatorio']
    },
    nit:{
        type: String,
        required: [true, 'El código nit es obligatorio']
    },
    municipio:{
        type: String,
        required: [true, 'El municipio es obligatorio']
    },
    director:{
        type: String,
        required: [true, 'El director es obligatorio']
    },
    resolucion_director:{
        type: String,
        required: [true, 'La resolución de nombramiento es obligatoria']
    },
    resolucion_fecha:{
        type: Date,
        required: [true, 'La fecha de la resoución de nombramiento es obligatoria']
    }
    
});

module.exports =  model('Client',dataSchema);