const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

app.set('port',process.env.PORT || 4001)
//middlewares
const cookieParser = require('cookie-parser');
const corsOption = require('./src/config/cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())

// // routes import
// contratacion
app.use('/api/v1',require("./src/routes/services"));
app.use('/api/v1',require("./src/routes/client"));
app.use('/api/v1',require("./src/routes/solicitud"));

// error middleware
const errorMiddleware = require('./src/middlewares/errors')
app.use(errorMiddleware)

module.exports =  app;
