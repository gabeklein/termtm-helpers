export function sleep(ms, fn) {
    if(!fn) return new Promise(resolve => setTimeout(resolve, ms));
    else arguments[2] !== undefined
        ? setTimeout(fn, ms, ...Array.slice.call(arguments, 2))
        : setTimeout(fn, ms)
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