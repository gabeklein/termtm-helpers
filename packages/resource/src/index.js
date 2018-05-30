const { CDN = "/static/" } = process.env;

if(!CDN) throw new Error(`\
    CDN not set in env!
    Need a url.\
`)

function source(name, ext = ""){
    let background;
    name = [].concat(name)[0];
    if(name[name.length - 1] == "!"){
        name = name.slice(0, -1);
        background = true;
    }
    name = CDN + name + ext;
    if(background) return `url("${name}")`
    else return name
}

export const src = (name) => source(name)
export const png = (name) => source(name, ".png")
export const svg = (name) => source(name, ".svg")
export const jpg = (name) => source(name, ".jpg")
export const mp4 = (name) => source(name, ".mp4")