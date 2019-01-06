#!/usr/bin/env node

const version = require('../package.json').version;
const commander = require("commander");
const __cwd = process.cwd();
const path = require("path");

const Koa = require("koa");
const trailing_slashes = require("koa-add-trailing-slashes");
const access_policy = require("@koa/cors");
const fs_routes = require("@gabeklein/fs-koa");

const program = module.exports = commander
    .version(version)
    .usage('[options] <scan-directory ...>')
    .option('-p --port <n>', "Port used by development server. Default: 3000", parseInt)
    .option('-r --prefix [name]', "Web directory in which all API calls are located.")
    .parse(process.argv);

const {
    port: PORT = 3000,
    prefix,
    args: [
       dir = "./api" 
    ]
} = program;

if(prefix)
if(prefix[0] == "/" || prefix.slice(-1)[0] == "/"){
    console.error(`\nPrefix of "${prefix}" should avoid leading or trailing slashes\n`)
    process.exit(1)
}

new Koa()
    .use(trailing_slashes())
    .use(access_policy())
    .use(fs_routes({
        directory: path.resolve(__cwd, dir),
        prefix: prefix ? "/" + prefix : undefined
    }))
    .listen(PORT)
    .on("listening", () => {
        console.log(`listening on port ${PORT}`)
    });