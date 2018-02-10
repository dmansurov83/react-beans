import { bean, connectBeans } from "../../../../src/beans";

@bean("example")
class ExampleService{
    action(){
        return 'ExampleServiceAction'
    }
}