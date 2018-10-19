import { bean, profile } from "../../../../src";

export const LOGGER = "log";

@bean(LOGGER)
export class DebugLogger{
    
    info(...args){
        console.log((new Date()).toISOString(), ...args)
    }

    error(...args){
        console.error((new Date()).toISOString(), ...args)
    }
}

@bean(LOGGER)
@profile("release")
export class ReleaseLogger{
    
    info(...args){
    }

    error(...args){
    }
}