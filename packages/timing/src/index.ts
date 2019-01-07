const UNIT = new class {
    [unit: string]: number;

    ms = 1
    seconds = 1000
    minutes = 1000 * 60
    hours = 1000 * 60 * 60
}

function Defer<T>(ms: number, task: Promise<T>) : Promise<T> {
    return Promise
        .all([ task, Sleep(ms) ])
        .then(([task]) => task);
}

class AttemptHandler<ReturnType = any> {
    constructor(
        private t1: number,
        private t2?: number
    ){}

    try(task: () => Promise<ReturnType>){
        return Within(this.t1, this.t2, task)
    }
}

class Timer extends Promise<void> {

    cancel: () => void;
    runDuration?: number;
    id: number;

    toString(){
        let description = `[Promise] Timeout: ${this.id}`;
        if(this.runDuration) 
            description += ` (Cancelled after ${this.runDuration})`;
        return description;
    }

    constructor(
        time: number, 
        unit: string = "seconds",
        throwOnCancel?: boolean){

        let timerID: number;
        let onCancel: Function;
        let onResolve: Function;
        let startTime: number;

        super((resolve, reject) => { 
            onCancel = reject; 
            onResolve = resolve;
            startTime = Date.now();
            timerID = setTimeout(resolve, UNIT[unit] * time);     
        });

        this.id = timerID!;
        this.cancel = () => {
            this.runDuration = Date.now() - startTime;
            clearTimeout(timerID!);
            if(throwOnCancel) onCancel(this);
            else onResolve(this);
        }
    }
}

function Sleep(ms: number): Promise<void>;

function Sleep<CallbackArguments extends any[]>(
    ms: number, 
    callback: (...args: CallbackArguments) => any, 
    ...args: CallbackArguments
): number;

function Sleep(ms: number, callback?: Function){
    if(!callback) 
        return new Promise<void>(resolve => {
            setTimeout(resolve, ms)
        });

    else return (
        arguments[2] !== undefined
        ? setTimeout(callback, ms, ...[].slice.call(arguments, 2))
        : setTimeout(callback, ms)
    )
}

function Within(
    timeout: number
):  AttemptHandler;

function Within<T>(
    timeout: number, 
    promisingAction?: () => Promise<T>
):  Promise<T>

function Within<T>(
    Defer: number, 
    timeout?: number, 
    promisingAction?: () => Promise<T>
):  Promise<T>

function Within<T>(
    t1: number, 
    t2?: number | typeof task, 
    task?: () => Promise<T>){

    let action: typeof task;

    if(!t1) throw new Error("Needs atleast a timeout");
    
    if(task)
        action = task;
    else {
        action = t2 as typeof task;
        t2 = undefined;
    }

    if(typeof action !== "function")
        return new AttemptHandler(t1, t2 as number | undefined);

    const race = Promise.race([
        action(),
        new Promise(
            function timeout(_, reject){ 
                const allotment = typeof t2 == "number" ? t2 : t1;
                setTimeout(
                    () => reject(`timeout: ${allotment}ms`), 
                    allotment)
            }
        )
    ])
    
    return typeof t2 == "number" ? Defer(t1, race) : race;
}

export { Within, Sleep, Defer, Timer };