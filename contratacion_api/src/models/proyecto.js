const { Schema, model, Types } = require("mongoose");
const validator = require("validator")

const dataSchema = new Schema({
    solicitud: { type: Types.ObjectId, required: true, refPath: 'Solicitud' },
    oferta:{

    },
    contrato:{

    },
    revisiones:[

    ],
    calidad_plan:{

    },
    tarea_tecnica:{

    },
    tarea_proyeccion:{

    },
    equipo:[

    ],
    cronograma:[
        
    ]
});

module.exports =  model('Proyecto',dataSchema);