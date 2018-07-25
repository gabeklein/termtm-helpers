export function sleep(ms, fn) {
    if(!fn) return new Promise(resolve => setTimeout(resolve, ms));
    else arguments[2] !== undefined
        ? setTimeout(fn, ms, ...Array.slice.call(arguments, 2))
        : setTimeout(fn, ms)
}

const UNIT = {
    ms: 1,
    seconds: 1000,
    minutes: 1000 * 60,
    hours: 1000 * 60 * 60
}

export function timer(time, unit = "seconds", throwOnCancel){
    time = UNIT[unit] * time;

    let timer;
    let cancel;
    const promise = new Promise(
        (resolve, reject) => { 
            cancel = reject; 
            timer = setTimeout(resolve, time)         
        }
    );

    promise.cancel = () => {
        if(throwOnCancel) cancel("canceled");
        clearTimeout(timer);
    }

    return promise;
}

export function within(t1, t2, task){
    if(!task)
        task = t2,
        t2 = null

    if(typeof task != "function")
        return {
            try(task){
                return within(t1, t2, task)
            }
        }

    task = task();

    const timeout = new Promise(
        (_, reject) => { setTimeout(
            reject, t2 || t1, "timeout"
        )}
    )
    
    task = Promise.race([ timeout, task ])
    
    return t2 ? atleast(t1, task) : task;
}

export function atleast(ms, task){
    return Promise
        .all([ task, sleep(ms) ])
        .then(([task]) => task);
}