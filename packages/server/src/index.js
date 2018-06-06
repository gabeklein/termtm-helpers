import request from "superagent"

const ENDPOINT = process.env.ENDPOINT;

if(!ENDPOINT) throw new Error(`\
    ENDPOINT not set in env!
    Need a url.\
`)

export default function api(endpoint) {
    return {
        send(body){
            if(!body)
                throw new Error("Need data to send!")
            return request
                .post(`${ENDPOINT}/${endpoint}`)
                .set('Accept', 'application/json')
                .send(body)
        }
    }
}