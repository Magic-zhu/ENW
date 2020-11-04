const http = require('http');
const Emitter = require('events');
const { typeOf } = require('./util');
module.exports = class Application extends Emitter {

    constructor(options) {
        super();
        options = options || {};
        this.server = null;
        this.middleware = []; 
        this.request = Object.create(null);
        this.response = Object.create(null);
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

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        this.middleware.push(fn)
    }

    /**
     * 处理请求
     * @param {*} req 
     * @param {*} res 
     * @api private
     */
    handleRequest(req, res) {
        const context = this.createContext(req, res)
        this.handleMiddleWare(context)
        this.handleRespond(context)
        this.response.json({
            errcode: 0
        })
    }

    handleRespond(context) {
        context.res.json = function (input) {
            if (typeOf(input) != 'Object' && typeOf(input) != 'Array') {
                res.end('')
            }
            let str = JSON.stringify(input)
            res.writeHead(context.status, { 'Content-type': 'text/plain' });
            res.write(str);
            res.end();
        }
        context.req.html = function (html) {
            res.writeHead(context.status, { 'Content-type': 'text/html' });
            res.write(html);
            res.end();
        }
    }

    /**
   * 初始化一个上下文
   * @param {*} req 
   * @param {*} res
   * @api private
   */
    createContext(req, res) {
        const context = Object.create(null);
        context.req = req;
        context.res = res;
        context.originalUrl = req.url;
    }

    handleMiddleWare(ctx) {
        let next = () => {
            this.emit('middleWareNext');
        }
        let n = 0;
        this.middleware[0](ctx, next);
        this.on('middleWareNext', () => {
            n++;
            if (n <= this.middleware.length - 1) {
                try {
                    this.middleware[n](ctx, next);
                } catch (error) {
                    console.log(error)
                }
            } else {
                this.removeAllListeners('middleWareNext');
            }
        })
    }
}