const { send, json, createError } = require('micro')
const router = require('fs-router')
const path = require("path")

export default function Server(dir){
    return handle( router( absolutePath( dir )))
}

function absolutePath(dir){
    if(/^\.\//.test(dir)){
        let d = process.env.PWD;
        if(!d) throw new Error(`Path ${dir} is not absolute! Use __dirname to add your applications path or use an npm script to launch micro.`);
        let { main } = require(`${d}/package.json`) || false;
        if(main){
            d = path.join( d, path.dirname(main) )
        }
        
        dir = path.join(d, dir);
    }
    return dir;
}

export function handle(withRouter){
    return async function handle(req, res) {
        req.url = req.url.replace(/^\/api/, "").replace(/\/$/, "")

        let matched = withRouter(req)
        if (matched) 
            await matched(
                new context(req, res)
            )
        else
            send(res, 404, `No ${req.method} action at url ${req.url}`)
    }
}

class context {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    
    get json(){
        return json(this.req).catch(err => {
            throw createError(400, "Bad JSON")
        });
    }

    send(){
        const args = Array.from(arguments);

        if(typeof args[0] != "number")
            args.unshift(200);

        if(args[1] === undefined)
            args.push("OK")

        send(this.res, ...args)
    }
}