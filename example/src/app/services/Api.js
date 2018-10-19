import {bean, inject} from "../../../../src";
import {LOGGER} from "./Logger";
import {EXAMPLE_SERVICE} from "./ExampleService";

export const API_SERVICE = "apiService";

@bean(API_SERVICE)
class Api{
    @inject(LOGGER)
    log;
    @inject(EXAMPLE_SERVICE)
    example;

    getData(count = 10){
        this.log.info('ApiService getData', count);
        return [...Array(count).keys()]
    }
}