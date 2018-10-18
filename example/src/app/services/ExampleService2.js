import {bean, inject} from "../../../../src/beans";
import {LOGGER} from "./Logger";
import {EXAMPLE_SERVICE} from "./ExampleService";

export const EXAMPLE_SERVICE2 = "example2";

@bean(EXAMPLE_SERVICE2)
class ExampleService2{
    @inject(LOGGER)
    log;
    @inject(EXAMPLE_SERVICE)
    example;
    action(arg){
        this.log.info("ExampleService", this.example.action());
        this.log.info("ExampleService2", arg);
        return 'ExampleService2Action arg = ' + arg
    }
}