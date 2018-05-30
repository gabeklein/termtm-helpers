import { mailgun } from "lib/mail"
import { authorize } from "lib/authorize"
import { send, json } from "micro";

export async function POST(ctx){

    const { opaqueData, passengerName } = await ctx.json;

    const transaction = authorize({
        transactionType: "authOnlyTransaction",
        amount: 500,
        payment: {
            opaqueData
        },
        order: {
            description: "FRLA Trip Cost-Share"
        },
        customerIP: "255.255.255.255"
    })
    
    let result;

    try { 
        result = ctx.body = await transaction 
        send(res, 200)
    } 
    catch(err){
        result = { status: "error" }
        send(res, 400, "Nonce was rejected.")
    }

    const message = 
        result.status == "approved"
            ? [
                "Payment was processed",
                `\nCharge did occure on Dover's flight,\ntransaction number: ${result.id}.\nPassenger name: ${passengerName}`
            ]
            : [
                "One of payments failed",
                `\nCharge did occure on Dover's flight, but did fail.\nCode was ${result.status}.\nPassenger name: ${passengerName}\n`
            ]

    await mailgun.messages().send({
        from: "Site <info@flytrendaviation.com>",
        to: 'gabe@flytrendaviation.com',
        subject: message[0],
        text: message[1]
    })
}