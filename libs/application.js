
const http = require('http');
const Emitter = require('events');
const { typeOf } = require('./util')
module.exports = class Application extends Emitter {

    constructor(options) {
        super();
        options = options || {};
        this.server = null;
        this.middleware = [];
        this.request = Object.create(null);
        this.response = Object.create(null);
        this.routerMap = {
            GET:{},
            POST:{},
            PUT:{},
            HEAD:{},
            DELETE:{},
        };
        this.routerNumber = 0;
    }

    /**
     * 端口监听
     * @param  {...any} args
     * @api public 
     */
    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        this.server = server;
        return server.listen(...args);
    }
 
    /**
     * 处理请求
     * @param {*} req 
     * @param {*} res 
     * @api private
     */
    handleRequest(req, res) {
        this.mergeRequest(req)
        this.mergeResponse(res)
        if (this.routerMap[req.method][req.url]) {
            this.routerMap[req.method][req.url].callback(this.request, this.response)
        }
    }

    handleRespond() {

    }

    mergeRequest(req) {
        this.request.method = req.method || '';
        this.request.headers = req.headers;
        this.request.route = req.url;
    }

    mergeResponse(res) {
        this.response.json = function (input) {
            if (typeOf(input) != 'Object' && typeOf(input) != 'Array'){
                res.end('')
            }
            let str = JSON.stringify(input)
            res.writeHead(200, { 'Content-type': 'text/plain'});
            res.write(str);
            res.end();
        }
        this.response.html = function(html){
            res.writeHead(200, { 'Content-type': 'text/html'});
            res.write(html);
            res.end();
        }
    }

    /**
     * 
     * @param {*} method 
     * @param {*} path 
     * @param {*} callback 
     * @api public
     */
    router(method, path, callback) {
        const handler = {
            id: this.routerNumber + 1,
            method,
            path,
            callback,
        }
        this.routerMap[method][path] = handler;
        this.routerNumber += 1;
    }
}