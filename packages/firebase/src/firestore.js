const Firestore = require('@google-cloud/firestore');

const {
    GC_PRIVATE_KEY,
    GC_CLIENT_EMAIL,
    GC_PROJECT
} = process.env;

if(GC_PROJECT && GC_CLIENT_EMAIL && GC_CLIENT_KEY);
else throw new Error(`\
    Goggle-Cloud login information not set in env!
    Need GC_PROJECT, GC_CLIENT_EMAIL and GC_CLIENT_KEY.\
`)

const COMPARISONS = {
    equals: "==",
    lessthan: "<",
    morethan: ">",
    notless: ">=",
    notmore: "<="
}

const PARSE_QUERY = /^(\w+?)\.(\w+)(?: *(==|>|<|>=|<=) *(\S+))?$/;

export const firestore = new Firestore({
    projectID: GC_PROJECT,
    credencials: {
        client_email: GC_CLIENT_EMAIL,
        client_key: GC_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
})

async function find(search, against, asserting, onValue){
    const found = await firestore.collection(search).where(against, asserting, onValue).get();
    const item = found.docs[0];
    if(item) return item.data();
    else return false;
}

export function where(query){

    const parse = Array
        .from(PARSE_QUERY.exec(query) || [])
        .filter(capture => capture !== undefined)

    switch(parse.length){
        case 3: {
            const opts = {};
            for(const comp in COMPARISONS)
                opts[comp] = value => {
                    if(value === "undefined")
                        throw new Error("No value provided to comparitor for firestore query!")
                    return find(parse[1], parse[2], COMPARISONS[comp], value)
                }
            return opts;
        }
        case 5:
            return find.apply(null, parse.slice(1))
        default:
            throw new Error("Bad Arguments")
    }
}