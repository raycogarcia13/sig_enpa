const { Schema, model, Types } = require("mongoose");
const validator = require("validator")
const Service = require('./service');
const Client = require('./client');

const dataSchema = new Schema({
    client: { type: Types.ObjectId, required: true, ref: Client },
    service: { type: Types.ObjectId, required: true, ref: Service },
    fecha_sol:{
        type: Date,
        required:[true,"La fecha es obligatoria"]
    },
    description:{
        type: String,
        required:[true,"La descripción es obligatoria"]
    },
    solicitante:{
        name:{
            type:String,
            required:[true,"El nombre del representante es obligatoria"]
        },
        cargo:{
            type:String,
            required:[true,"El cargo del representante es obligatoria"]
        }
    },
    docs:[
        {
            nombre:{
                type:String
            },
            file:{
                type:String
            }
        }
    ]

});

module.exports =  model('Solicitud',dataSchema);