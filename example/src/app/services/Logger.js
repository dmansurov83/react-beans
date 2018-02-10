import { bean } from "../../../../src/beans";


@bean("log")
class Logger{
    
    info(...args){
        console.log((new Date()).toISOString(), ...args)
    }

    error(...args){
        console.error((new Date()).toISOString(), ...args)
    }
}