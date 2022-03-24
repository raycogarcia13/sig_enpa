const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/sig_security'

var connectWithRetry = function() {
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(connection=> {
        console.log(`Mongodb connected to ${uri}`)
    })
    .catch(err=>{
        console.log(err);
        console.log(`reconecting to ${uri} ...`)
        setTimeout(connectWithRetry, 5000)
    })
    
  };
  connectWithRetry();


