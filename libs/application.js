const http = require('http')
module.exports = class Application extends Emmiter{

    constructor(options){
        super();
        options = options||{};
    }
    
    createHttpServer(){

    }

    listen(...args){
        const server = http.createServer();
        return server.listen(...args);
    }
}