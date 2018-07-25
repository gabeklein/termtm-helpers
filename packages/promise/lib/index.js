"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sleep = sleep;
exports.timer = timer;
exports.within = within;
exports.atleast = atleast;
function sleep(ms, fn) {
    if (!fn) return new Promise(resolve => setTimeout(resolve, ms));else arguments[2] !== undefined ? setTimeout(fn, ms, ...Array.slice.call(arguments, 2)) : setTimeout(fn, ms);
}

const UNIT = {
    ms: 1,
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60
};

function timer(time, unit = "seconds") {
    time = UNIT[unit] * time;

    let timer;
    let cancel;
    const promise = new Promise((resolve, reject) => {
        cancel = reject;
        timer = setTimeout(resolve, time);
    });

    promise.cancel = () => {
        cancel("canceled");
        clearTimeout(timer);
    };

    return promise;
}

function within(t1, t2, task) {
    if (!task) task = t2, t2 = null;

    if (typeof task != "function") return {
        try(task) {
            return within(t1, t2, task);
        }
    };

    task = task();

    const timeout = new Promise((_, reject) => {
        setTimeout(reject, t2 || t1, "timeout");
    });

    task = Promise.race([timeout, task]);

    return t2 ? atleast(t1, task) : task;
}

function atleast(ms, task) {
    return Promise.all([task, sleep(ms)]).then(([task]) => task);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJzbGVlcCIsInRpbWVyIiwid2l0aGluIiwiYXRsZWFzdCIsIm1zIiwiZm4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsIlVOSVQiLCJzZWNvbmRzIiwibWludXRlcyIsImhvdXJzIiwidGltZSIsInVuaXQiLCJjYW5jZWwiLCJwcm9taXNlIiwicmVqZWN0IiwiY2xlYXJUaW1lb3V0IiwidDEiLCJ0MiIsInRhc2siLCJ0cnkiLCJ0aW1lb3V0IiwiXyIsInJhY2UiLCJhbGwiLCJ0aGVuIl0sIm1hcHBpbmdzIjoiOzs7OztRQUFnQkEsSyxHQUFBQSxLO1FBY0FDLEssR0FBQUEsSztRQW9CQUMsTSxHQUFBQSxNO1FBeUJBQyxPLEdBQUFBLE87QUEzRFQsU0FBU0gsS0FBVCxDQUFlSSxFQUFmLEVBQW1CQyxFQUFuQixFQUF1QjtBQUMxQixRQUFHLENBQUNBLEVBQUosRUFBUSxPQUFPLElBQUlDLE9BQUosQ0FBWUMsV0FBV0MsV0FBV0QsT0FBWCxFQUFvQkgsRUFBcEIsQ0FBdkIsQ0FBUCxDQUFSLEtBQ0tLLFVBQVUsQ0FBVixNQUFpQkMsU0FBakIsR0FDQ0YsV0FBV0gsRUFBWCxFQUFlRCxFQUFmLEVBQW1CLEdBQUdPLE1BQU1DLEtBQU4sQ0FBWUMsSUFBWixDQUFpQkosU0FBakIsRUFBNEIsQ0FBNUIsQ0FBdEIsQ0FERCxHQUVDRCxXQUFXSCxFQUFYLEVBQWVELEVBQWYsQ0FGRDtBQUdSOztBQUVELE1BQU1VLE9BQU87QUFDVFYsUUFBSSxDQURLO0FBRVRXLGFBQVMsSUFGQTtBQUdUQyxhQUFTLE9BQU8sRUFIUDtBQUlUQyxXQUFPLE9BQU8sRUFBUCxHQUFZO0FBSlYsQ0FBYjs7QUFPTyxTQUFTaEIsS0FBVCxDQUFlaUIsSUFBZixFQUFxQkMsT0FBTyxTQUE1QixFQUFzQztBQUN6Q0QsV0FBT0osS0FBS0ssSUFBTCxJQUFhRCxJQUFwQjs7QUFFQSxRQUFJakIsS0FBSjtBQUNBLFFBQUltQixNQUFKO0FBQ0EsVUFBTUMsVUFBVSxJQUFJZixPQUFKLENBQ1osQ0FBQ0MsT0FBRCxFQUFVZSxNQUFWLEtBQXFCO0FBQ2pCRixpQkFBU0UsTUFBVDtBQUNBckIsZ0JBQVFPLFdBQVdELE9BQVgsRUFBb0JXLElBQXBCLENBQVI7QUFDSCxLQUpXLENBQWhCOztBQU9BRyxZQUFRRCxNQUFSLEdBQWlCLE1BQU07QUFDbkJBLGVBQU8sVUFBUDtBQUNBRyxxQkFBYXRCLEtBQWI7QUFDSCxLQUhEOztBQUtBLFdBQU9vQixPQUFQO0FBQ0g7O0FBRU0sU0FBU25CLE1BQVQsQ0FBZ0JzQixFQUFoQixFQUFvQkMsRUFBcEIsRUFBd0JDLElBQXhCLEVBQTZCO0FBQ2hDLFFBQUcsQ0FBQ0EsSUFBSixFQUNJQSxPQUFPRCxFQUFQLEVBQ0FBLEtBQUssSUFETDs7QUFHSixRQUFHLE9BQU9DLElBQVAsSUFBZSxVQUFsQixFQUNJLE9BQU87QUFDSEMsWUFBSUQsSUFBSixFQUFTO0FBQ0wsbUJBQU94QixPQUFPc0IsRUFBUCxFQUFXQyxFQUFYLEVBQWVDLElBQWYsQ0FBUDtBQUNIO0FBSEUsS0FBUDs7QUFNSkEsV0FBT0EsTUFBUDs7QUFFQSxVQUFNRSxVQUFVLElBQUl0QixPQUFKLENBQ1osQ0FBQ3VCLENBQUQsRUFBSVAsTUFBSixLQUFlO0FBQUVkLG1CQUNiYyxNQURhLEVBQ0xHLE1BQU1ELEVBREQsRUFDSyxTQURMO0FBRWYsS0FIVSxDQUFoQjs7QUFNQUUsV0FBT3BCLFFBQVF3QixJQUFSLENBQWEsQ0FBRUYsT0FBRixFQUFXRixJQUFYLENBQWIsQ0FBUDs7QUFFQSxXQUFPRCxLQUFLdEIsUUFBUXFCLEVBQVIsRUFBWUUsSUFBWixDQUFMLEdBQXlCQSxJQUFoQztBQUNIOztBQUVNLFNBQVN2QixPQUFULENBQWlCQyxFQUFqQixFQUFxQnNCLElBQXJCLEVBQTBCO0FBQzdCLFdBQU9wQixRQUNGeUIsR0FERSxDQUNFLENBQUVMLElBQUYsRUFBUTFCLE1BQU1JLEVBQU4sQ0FBUixDQURGLEVBRUY0QixJQUZFLENBRUcsQ0FBQyxDQUFDTixJQUFELENBQUQsS0FBWUEsSUFGZixDQUFQO0FBR0giLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gc2xlZXAobXMsIGZuKSB7XG4gICAgaWYoIWZuKSByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgZWxzZSBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZFxuICAgICAgICA/IHNldFRpbWVvdXQoZm4sIG1zLCAuLi5BcnJheS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpXG4gICAgICAgIDogc2V0VGltZW91dChmbiwgbXMpXG59XG5cbmNvbnN0IFVOSVQgPSB7XG4gICAgbXM6IDEsXG4gICAgc2Vjb25kczogMTAwMCxcbiAgICBtaW51dGVzOiAxMDAwICogNjAsXG4gICAgaG91cnM6IDEwMDAgKiA2MCAqIDYwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcih0aW1lLCB1bml0ID0gXCJzZWNvbmRzXCIpe1xuICAgIHRpbWUgPSBVTklUW3VuaXRdICogdGltZTtcblxuICAgIGxldCB0aW1lcjtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZShcbiAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4geyBcbiAgICAgICAgICAgIGNhbmNlbCA9IHJlamVjdDsgXG4gICAgICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkgICAgICAgICBcbiAgICAgICAgfVxuICAgICk7XG5cbiAgICBwcm9taXNlLmNhbmNlbCA9ICgpID0+IHtcbiAgICAgICAgY2FuY2VsKFwiY2FuY2VsZWRcIik7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW4odDEsIHQyLCB0YXNrKXtcbiAgICBpZighdGFzaylcbiAgICAgICAgdGFzayA9IHQyLFxuICAgICAgICB0MiA9IG51bGxcblxuICAgIGlmKHR5cGVvZiB0YXNrICE9IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyeSh0YXNrKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2l0aGluKHQxLCB0MiwgdGFzaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgdGFzayA9IHRhc2soKTtcblxuICAgIGNvbnN0IHRpbWVvdXQgPSBuZXcgUHJvbWlzZShcbiAgICAgICAgKF8sIHJlamVjdCkgPT4geyBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgcmVqZWN0LCB0MiB8fCB0MSwgXCJ0aW1lb3V0XCJcbiAgICAgICAgKX1cbiAgICApXG4gICAgXG4gICAgdGFzayA9IFByb21pc2UucmFjZShbIHRpbWVvdXQsIHRhc2sgXSlcbiAgICBcbiAgICByZXR1cm4gdDIgPyBhdGxlYXN0KHQxLCB0YXNrKSA6IHRhc2s7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdGxlYXN0KG1zLCB0YXNrKXtcbiAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAuYWxsKFsgdGFzaywgc2xlZXAobXMpIF0pXG4gICAgICAgIC50aGVuKChbdGFza10pID0+IHRhc2spO1xufSJdfQ==