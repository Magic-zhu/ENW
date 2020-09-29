'use strict'

const http = require('http');
const Emitter = require('events');
const request = require("./request");
const response = require('./response');

module.exports = class Application extends Emitter{

    constructor(options){
        super();
        options = options||{};
        this.server = null;
        this.middleware = {};
        this.request = Object.create(request);
        this.response = Object.create(response);
    }
    
    /**
     * 端口监听
     * @param  {...any} args
     * @api public 
     */
    listen(...args){
        const server = http.createServer(this.handleRequest);
        this.server = server;
        return server.listen(...args);
    }

    /**
     * 处理请求
     * @param {*} req 
     * @param {*} res 
     * @api private
     */
    handleRequest(req,res){
        console.log(req)
        res.writeHead(200, {'Content-type' : 'text/html'});
        res.write('<h1>Node.js</h1>');
        res.end('<p>Hello World</p>');
    }

}