const {uncaught,unhandled} = require('./src/utils/otherErrors')
uncaught();

require('dotenv').config({path:'src/config/config.env'});
require('./src/config/database')
const app = require('./app')

function main() {
    const server = app.listen(app.get('port'),()=>{
        console.log(`Server running at ${app.get('port')} port in ${process.env.NODE_ENV} mode`)
    });
    unhandled(server)
}




main();