import { profile, bean, connectBeans } from "../../../../src/beans";


@bean("example") //first 
@profile("test") // second, its important
class ExampleService{
    action(){
        return 'TestExampleServiceAction'
    }
}

@bean("example")
class TestExampleService{
    action(){
        return 'ExampleServiceAction'
    }
}