import { profile, bean, connectBeans } from "../../../../src/beans";

@bean("example") //first 
@profile("test") // second, its important
class TestExampleService{
    action(){
        return 'TestExampleServiceAction'
    }
}

@bean("example")
class ExampleService{
    action(){
        return 'ExampleServiceAction'
    }
}