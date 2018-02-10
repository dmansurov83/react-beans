import { bean, connectBeans } from "../../../../src/beans";

@bean("example2")
@connectBeans("log", "example")
class ExampleService2{
    action(arg){
        this.log().info("ExampleService", this.example().action())
        this.log().info("ExampleService2", arg)
        return 'ExampleService2Action arg = ' + arg
    }
}