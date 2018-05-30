"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = api;

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { SERVICE_ENDPOINT } = process.env;

if (!SERVICE_ENDPOINT) throw new Error(`\
    SERVICE_ENDPOINT not set in env!
    Need a url.\
`);

function api(endpoint) {
    return {
        send(body) {
            if (!body) throw new Error("Need data to send!");
            return _superagent2.default.post(`${SERVICE_ENDPOINT}/${endpoint}`).set('Accept', 'application/json').send(body);
        }
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJTRVJWSUNFX0VORFBPSU5UIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiZW5kcG9pbnQiLCJzZW5kIiwiYm9keSIsInJlcXVlc3QiLCJwb3N0Iiwic2V0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFTd0JBLEc7O0FBVHhCOzs7Ozs7QUFFQSxNQUFNLEVBQUVDLGdCQUFGLEtBQXVCQyxRQUFRQyxHQUFyQzs7QUFFQSxJQUFHLENBQUNGLGdCQUFKLEVBQXNCLE1BQU0sSUFBSUcsS0FBSixDQUFXOzs7Q0FBWCxDQUFOOztBQUtQLFNBQVNKLEdBQVQsQ0FBYUssUUFBYixFQUF1QjtBQUNsQyxXQUFPO0FBQ0hDLGFBQUtDLElBQUwsRUFBVTtBQUNOLGdCQUFHLENBQUNBLElBQUosRUFDSSxNQUFNLElBQUlILEtBQUosQ0FBVSxvQkFBVixDQUFOO0FBQ0osbUJBQU9JLHFCQUNGQyxJQURFLENBQ0ksR0FBRVIsZ0JBQWlCLElBQUdJLFFBQVMsRUFEbkMsRUFFRkssR0FGRSxDQUVFLFFBRkYsRUFFWSxrQkFGWixFQUdGSixJQUhFLENBR0dDLElBSEgsQ0FBUDtBQUlIO0FBUkUsS0FBUDtBQVVIIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSBcInN1cGVyYWdlbnRcIlxuXG5jb25zdCB7IFNFUlZJQ0VfRU5EUE9JTlQgfSA9IHByb2Nlc3MuZW52O1xuXG5pZighU0VSVklDRV9FTkRQT0lOVCkgdGhyb3cgbmV3IEVycm9yKGBcXFxuICAgIFNFUlZJQ0VfRU5EUE9JTlQgbm90IHNldCBpbiBlbnYhXG4gICAgTmVlZCBhIHVybC5cXFxuYClcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXBpKGVuZHBvaW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VuZChib2R5KXtcbiAgICAgICAgICAgIGlmKCFib2R5KVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5lZWQgZGF0YSB0byBzZW5kIVwiKVxuICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3RcbiAgICAgICAgICAgICAgICAucG9zdChgJHtTRVJWSUNFX0VORFBPSU5UfS8ke2VuZHBvaW50fWApXG4gICAgICAgICAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICAgICAgICAgICAgICAgIC5zZW5kKGJvZHkpXG4gICAgICAgIH1cbiAgICB9XG59Il19