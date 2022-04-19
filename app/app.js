const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

app.set('port',process.env.PORT || 4050)
//middlewares
const corsOption = require('./cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'50mb'}));

// // routes import
app.use(express.static(path.join(__dirname, "../sig_frontend/build")));
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../sig_frontend/build/index.html'))
})
module.exports =  app;
