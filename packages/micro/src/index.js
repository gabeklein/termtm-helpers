const { send, json, createError } = require('micro')
const router = require('fs-router')
const path = require("path")

const SUB_API = /^\/api/;

export default function Server(dir, backup){
    dir = ensureAbsolute( dir );
    const fsRouter = router( dir );
    return handle(fsRouter, backup);
}

function ensureAbsolute(dir){
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

export function handle(withRouter, backup){
    return async function handle(req, res) {
        req.url = req.url.replace(/\/$/, "");

        if(SUB_API.test(req.url) == true){
            req.url = req.url.replace(SUB_API, "")
            let matched = withRouter(req);
            if (matched)
                return await matched(
                    new context(req, res)
                )
            else 
                return send(res, 404, `No ${req.method} action at url ${req.url}`)
        }

        else if(backup)
            return await backup(req, res);

        send(res, 404, `No route for url ${req.url}`)
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