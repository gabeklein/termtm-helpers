const CDN = process.env.CDN;

function noop([strings, ...keys]) {
  const lastIndex = strings.length - 1;
  return strings
    .slice(0, lastIndex)
    .reduce((p, s, i) => p + s + keys[i], '')
    + strings[lastIndex];
};

if(!CDN) throw new Error(`\
    CDN not set in env!
    Need a url.\
`)

function source(args, ext = ""){
    let background;
    let name = noop(args);
    if(name[name.length - 1] == "!"){
        name = name.slice(0, -1);
        background = true;
    }
    name = CDN + name + ext;
    if(background) return `url("${name}")`
    else return name
}

export const src = (...args) => source(args)
export const png = (...args) => source(args, ".png")
export const svg = (...args) => source(args, ".svg")
export const jpg = (...args) => source(args, ".jpg")
export const mp4 = (...args) => source(args, ".mp4")