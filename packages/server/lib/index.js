"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = api;

var _superagent = require("superagent");

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ENDPOINT = process.env.ENDPOINT;

if (!ENDPOINT) throw new Error(`\
    ENDPOINT not set in env!
    Need a url.\
`);

function api(endpoint) {
    return {
        send(body) {
            if (!body) throw new Error("Need data to send!");
            return _superagent2.default.post(`${ENDPOINT}/${endpoint}`).set('Accept', 'application/json').send(body);
        }
    };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhcGkiLCJFTkRQT0lOVCIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImVuZHBvaW50Iiwic2VuZCIsImJvZHkiLCJyZXF1ZXN0IiwicG9zdCIsInNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBU3dCQSxHOztBQVR4Qjs7Ozs7O0FBRUEsTUFBTUMsV0FBV0MsUUFBUUMsR0FBUixDQUFZRixRQUE3Qjs7QUFFQSxJQUFHLENBQUNBLFFBQUosRUFBYyxNQUFNLElBQUlHLEtBQUosQ0FBVzs7O0NBQVgsQ0FBTjs7QUFLQyxTQUFTSixHQUFULENBQWFLLFFBQWIsRUFBdUI7QUFDbEMsV0FBTztBQUNIQyxhQUFLQyxJQUFMLEVBQVU7QUFDTixnQkFBRyxDQUFDQSxJQUFKLEVBQ0ksTUFBTSxJQUFJSCxLQUFKLENBQVUsb0JBQVYsQ0FBTjtBQUNKLG1CQUFPSSxxQkFDRkMsSUFERSxDQUNJLEdBQUVSLFFBQVMsSUFBR0ksUUFBUyxFQUQzQixFQUVGSyxHQUZFLENBRUUsUUFGRixFQUVZLGtCQUZaLEVBR0ZKLElBSEUsQ0FHR0MsSUFISCxDQUFQO0FBSUg7QUFSRSxLQUFQO0FBVUgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tIFwic3VwZXJhZ2VudFwiXG5cbmNvbnN0IEVORFBPSU5UID0gcHJvY2Vzcy5lbnYuRU5EUE9JTlQ7XG5cbmlmKCFFTkRQT0lOVCkgdGhyb3cgbmV3IEVycm9yKGBcXFxuICAgIEVORFBPSU5UIG5vdCBzZXQgaW4gZW52IVxuICAgIE5lZWQgYSB1cmwuXFxcbmApXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFwaShlbmRwb2ludCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHNlbmQoYm9keSl7XG4gICAgICAgICAgICBpZighYm9keSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOZWVkIGRhdGEgdG8gc2VuZCFcIilcbiAgICAgICAgICAgIHJldHVybiByZXF1ZXN0XG4gICAgICAgICAgICAgICAgLnBvc3QoYCR7RU5EUE9JTlR9LyR7ZW5kcG9pbnR9YClcbiAgICAgICAgICAgICAgICAuc2V0KCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpXG4gICAgICAgICAgICAgICAgLnNlbmQoYm9keSlcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=