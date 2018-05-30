"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.POST = POST;

var _mail = require("lib/mail");

var _authorize = require("lib/authorize");

var _micro = require("micro");

async function POST(ctx) {

    const { opaqueData, passengerName } = await ctx.json;

    const transaction = (0, _authorize.authorize)({
        transactionType: "authOnlyTransaction",
        amount: 500,
        payment: {
            opaqueData
        },
        order: {
            description: "FRLA Trip Cost-Share"
        },
        customerIP: "255.255.255.255"
    });

    let result;

    try {
        result = ctx.body = await transaction;
        (0, _micro.send)(res, 200);
    } catch (err) {
        result = { status: "error" };
        (0, _micro.send)(res, 400, "Nonce was rejected.");
    }

    const message = result.status == "approved" ? ["Payment was processed", `\nCharge did occure on Dover's flight,\ntransaction number: ${result.id}.\nPassenger name: ${passengerName}`] : ["One of payments failed", `\nCharge did occure on Dover's flight, but did fail.\nCode was ${result.status}.\nPassenger name: ${passengerName}\n`];

    await _mail.mailgun.messages().send({
        from: "Site <info@flytrendaviation.com>",
        to: 'gabe@flytrendaviation.com',
        subject: message[0],
        text: message[1]
    });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJQT1NUIiwiY3R4Iiwib3BhcXVlRGF0YSIsInBhc3Nlbmdlck5hbWUiLCJqc29uIiwidHJhbnNhY3Rpb24iLCJ0cmFuc2FjdGlvblR5cGUiLCJhbW91bnQiLCJwYXltZW50Iiwib3JkZXIiLCJkZXNjcmlwdGlvbiIsImN1c3RvbWVySVAiLCJyZXN1bHQiLCJib2R5IiwicmVzIiwiZXJyIiwic3RhdHVzIiwibWVzc2FnZSIsImlkIiwibWFpbGd1biIsIm1lc3NhZ2VzIiwic2VuZCIsImZyb20iLCJ0byIsInN1YmplY3QiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7OztRQUlzQkEsSSxHQUFBQSxJOztBQUp0Qjs7QUFDQTs7QUFDQTs7QUFFTyxlQUFlQSxJQUFmLENBQW9CQyxHQUFwQixFQUF3Qjs7QUFFM0IsVUFBTSxFQUFFQyxVQUFGLEVBQWNDLGFBQWQsS0FBZ0MsTUFBTUYsSUFBSUcsSUFBaEQ7O0FBRUEsVUFBTUMsY0FBYywwQkFBVTtBQUMxQkMseUJBQWlCLHFCQURTO0FBRTFCQyxnQkFBUSxHQUZrQjtBQUcxQkMsaUJBQVM7QUFDTE47QUFESyxTQUhpQjtBQU0xQk8sZUFBTztBQUNIQyx5QkFBYTtBQURWLFNBTm1CO0FBUzFCQyxvQkFBWTtBQVRjLEtBQVYsQ0FBcEI7O0FBWUEsUUFBSUMsTUFBSjs7QUFFQSxRQUFJO0FBQ0FBLGlCQUFTWCxJQUFJWSxJQUFKLEdBQVcsTUFBTVIsV0FBMUI7QUFDQSx5QkFBS1MsR0FBTCxFQUFVLEdBQVY7QUFDSCxLQUhELENBSUEsT0FBTUMsR0FBTixFQUFVO0FBQ05ILGlCQUFTLEVBQUVJLFFBQVEsT0FBVixFQUFUO0FBQ0EseUJBQUtGLEdBQUwsRUFBVSxHQUFWLEVBQWUscUJBQWY7QUFDSDs7QUFFRCxVQUFNRyxVQUNGTCxPQUFPSSxNQUFQLElBQWlCLFVBQWpCLEdBQ00sQ0FDRSx1QkFERixFQUVHLCtEQUE4REosT0FBT00sRUFBRyxzQkFBcUJmLGFBQWMsRUFGOUcsQ0FETixHQUtNLENBQ0Usd0JBREYsRUFFRyxrRUFBaUVTLE9BQU9JLE1BQU8sc0JBQXFCYixhQUFjLElBRnJILENBTlY7O0FBV0EsVUFBTWdCLGNBQVFDLFFBQVIsR0FBbUJDLElBQW5CLENBQXdCO0FBQzFCQyxjQUFNLGtDQURvQjtBQUUxQkMsWUFBSSwyQkFGc0I7QUFHMUJDLGlCQUFTUCxRQUFRLENBQVIsQ0FIaUI7QUFJMUJRLGNBQU1SLFFBQVEsQ0FBUjtBQUpvQixLQUF4QixDQUFOO0FBTUgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYWlsZ3VuIH0gZnJvbSBcImxpYi9tYWlsXCJcbmltcG9ydCB7IGF1dGhvcml6ZSB9IGZyb20gXCJsaWIvYXV0aG9yaXplXCJcbmltcG9ydCB7IHNlbmQsIGpzb24gfSBmcm9tIFwibWljcm9cIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoY3R4KXtcblxuICAgIGNvbnN0IHsgb3BhcXVlRGF0YSwgcGFzc2VuZ2VyTmFtZSB9ID0gYXdhaXQgY3R4Lmpzb247XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IGF1dGhvcml6ZSh7XG4gICAgICAgIHRyYW5zYWN0aW9uVHlwZTogXCJhdXRoT25seVRyYW5zYWN0aW9uXCIsXG4gICAgICAgIGFtb3VudDogNTAwLFxuICAgICAgICBwYXltZW50OiB7XG4gICAgICAgICAgICBvcGFxdWVEYXRhXG4gICAgICAgIH0sXG4gICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJGUkxBIFRyaXAgQ29zdC1TaGFyZVwiXG4gICAgICAgIH0sXG4gICAgICAgIGN1c3RvbWVySVA6IFwiMjU1LjI1NS4yNTUuMjU1XCJcbiAgICB9KVxuICAgIFxuICAgIGxldCByZXN1bHQ7XG5cbiAgICB0cnkgeyBcbiAgICAgICAgcmVzdWx0ID0gY3R4LmJvZHkgPSBhd2FpdCB0cmFuc2FjdGlvbiBcbiAgICAgICAgc2VuZChyZXMsIDIwMClcbiAgICB9IFxuICAgIGNhdGNoKGVycil7XG4gICAgICAgIHJlc3VsdCA9IHsgc3RhdHVzOiBcImVycm9yXCIgfVxuICAgICAgICBzZW5kKHJlcywgNDAwLCBcIk5vbmNlIHdhcyByZWplY3RlZC5cIilcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0gXG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPT0gXCJhcHByb3ZlZFwiXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBcIlBheW1lbnQgd2FzIHByb2Nlc3NlZFwiLFxuICAgICAgICAgICAgICAgIGBcXG5DaGFyZ2UgZGlkIG9jY3VyZSBvbiBEb3ZlcidzIGZsaWdodCxcXG50cmFuc2FjdGlvbiBudW1iZXI6ICR7cmVzdWx0LmlkfS5cXG5QYXNzZW5nZXIgbmFtZTogJHtwYXNzZW5nZXJOYW1lfWBcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgIFwiT25lIG9mIHBheW1lbnRzIGZhaWxlZFwiLFxuICAgICAgICAgICAgICAgIGBcXG5DaGFyZ2UgZGlkIG9jY3VyZSBvbiBEb3ZlcidzIGZsaWdodCwgYnV0IGRpZCBmYWlsLlxcbkNvZGUgd2FzICR7cmVzdWx0LnN0YXR1c30uXFxuUGFzc2VuZ2VyIG5hbWU6ICR7cGFzc2VuZ2VyTmFtZX1cXG5gXG4gICAgICAgICAgICBdXG5cbiAgICBhd2FpdCBtYWlsZ3VuLm1lc3NhZ2VzKCkuc2VuZCh7XG4gICAgICAgIGZyb206IFwiU2l0ZSA8aW5mb0BmbHl0cmVuZGF2aWF0aW9uLmNvbT5cIixcbiAgICAgICAgdG86ICdnYWJlQGZseXRyZW5kYXZpYXRpb24uY29tJyxcbiAgICAgICAgc3ViamVjdDogbWVzc2FnZVswXSxcbiAgICAgICAgdGV4dDogbWVzc2FnZVsxXVxuICAgIH0pXG59Il19