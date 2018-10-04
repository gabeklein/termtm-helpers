
const Router = require("koa-router");
const fs = require("fs");
const path = require("path")
const VERBS = [
    "default",
    "JSON",
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "PATCH"
];

module.exports = ({directory, prefix, onError}) => {
    const files = fs.readdirSync(directory);
    const router = new Router({ prefix });

    for(let file of files){
        const dir = path.join(directory, file);
        const stat = fs.statSync(dir);
        if(stat.isDirectory() || stat.isFile()){
            if(/\.js$/.test(file))
                file = file.substring(0, file.length - 3)
            addRoute(file, dir)
        }
    }

    router.all("*", async(ctx, next) => {
        await next();
        if(ctx.status !== 404)
            return;
        if(typeof error == "function")
            await error(ctx);
        else {
            ctx.body = `No method ${ctx.method} found for route ${ctx.captures[0].replace(/\/$/, "")}`
        }
    })
    
    function addRoute(name, dir){
        const mod = require(dir);
        let handle = mod.route || mod.default;
    
        if(handle instanceof Router)
            return;
        else {
            handle = new Router();
            if(mod.POST && mod.JSON)
                throw new Error("JSON is a pseudonym of POST but POST already exist in this module!")
    
            for(let verb of VERBS) if(mod[verb])
                if(typeof mod[verb] == "function"){
                    const type = 
                        verb == "default" ? "all" : 
                        verb == "JSON" ? "post" :
                        verb.toLowerCase();
    
                    handle[type]("*", mod[verb])
                }
                else throw new Error(`Module export "${verb}" expects a function!`);
        }
        router.use(`/${name}/`, handle.routes());
    }

    return router.routes();
}