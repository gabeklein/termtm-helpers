import request from "superagent"

const { SERVICE_ENDPOINT } = process.env;

if(!SERVICE_ENDPOINT) throw new Error(`\
    SERVICE_ENDPOINT not set in env!
    Need a url.\
`)

export default function api(endpoint) {
    return {
        send(body){
            if(!body)
                throw new Error("Need data to send!")
            return request
                .post(`${SERVICE_ENDPOINT}/${endpoint}`)
                .set('Accept', 'application/json')
                .send(body)
        }
    }
}