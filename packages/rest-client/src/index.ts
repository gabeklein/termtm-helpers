import axios from "axios"

let { ENDPOINT } = process.env;

if(ENDPOINT)
    ENDPOINT = ENDPOINT.replace(/([^\/])$/, "$1/"); 
else throw new Error(`\
    ENDPOINT not set in env!
    Need a url.\
`);

export default class API {

    private route: string;

    constructor(route: string){
        if(route[0] == "/")
            throw new Error(`Leading slash not allowed in route ${route}`)
        this.route = route;
    }

    send(body: string | object){
        if(!body)
            throw new Error("Need data to send!");

        return axios.post(ENDPOINT + this.route, body, {
            headers: {
                Accept: "application/json"
            }
        })
    }
}