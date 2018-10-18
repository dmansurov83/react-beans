import { profile, bean } from "../../../../src/beans";

export const EXAMPLE_SERVICE = "example";

@bean(EXAMPLE_SERVICE) //first
@profile("test") // second, its important
class TestExampleService{
    action(){
        return 'TestExampleServiceAction'
    }
}

@bean(EXAMPLE_SERVICE)
class ExampleService{
    action(){
        return 'ExampleServiceAction'
    }
}