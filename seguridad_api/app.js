const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

app.set('port',process.env.PORT || 3000)
//middlewares
const cookieParser = require('cookie-parser');
const corsOption = require('./src/config/cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())

// // routes import
// User and auth
app.use('/api/v1',require("./src/routes/auth"));
app.use('/api/v1',require("./src/routes/utils"));


// error middleware
const errorMiddleware = require('./src/middlewares/errors')
app.use(errorMiddleware)

module.exports =  app;
