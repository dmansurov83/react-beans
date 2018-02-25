import { bean, profile } from "../../../../src/beans";

@bean("log")
@profile("debug")
class DebugLogger{
    
    info(...args){
        console.log((new Date()).toISOString(), ...args)
    }

    error(...args){
        console.error((new Date()).toISOString(), ...args)
    }
}

@bean("log")
@profile("release")
class ReleaseLogger{
    
    info(...args){
    }

    error(...args){
    }
}