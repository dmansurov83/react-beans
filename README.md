# react-beans
# 0.1.0 critical api changes:
- all injections by property @inject now.
- @connectBeans now only for react components, otherwise it causes an error;
- @connectBeans now without args;
## React dependency injection library

Usage:

1. Wrap your app with BeanProvider component:
```jsx harmony
        <BeanProvider>
            <App/>
        <BeanProvider>
```    
2. Register your bean services:
* with decorators:
```jsx harmony
export const EXAMPLE_SERVICE = "example";

@bean(EXAMPLE_SERVICE)
export default class ExampleService{
    doAction = () => "ActionResult"
}
```
or 
```jsx harmony
bean(EXAMPLE_SERVICE)(ExampleService)
```
3. Inject:

important: js files should be imported to be added to the chunk

All injections are lazy - Instances are created only if you access to the @inject property.
  

* to component
```jsx harmony
@connectBeans
class About extends Component {
    @inject(EXAMPLE_SERVICE)
    example;
    @inject(OTHER_SERVICE)
    otherService;
    ...
    componentDidMount(){
        const result = this.example.doAction();
        this.otherService.someAction(result)
    }
    ...
}
```
* to other service
```jsx harmony
const ALERT_SERVICE = "alert";

@bean(ALERT_SERVICE)
@connectBeans(EXAMPLE_SERVICE, OTHER_SERVICE)
class AlertService {
    @inject("example")
    example;
    @inject("otherService")
    otherService;
    
    postInject(){
        //do something after bean injected 
    }
        
    ...
    alert = () => {
        const result = this.example.doAction();
        this.otherService.someAction(result)
    }
    ...
}
```      
## Profiles
You can define which bean will be created depending on the active profile.
1. Declare beans for profiles:
```jsx harmony
@bean(LOGGER)
@profile("debug", "test")
class DebugLogger{    
    info(...args){
        console.log((new Date()).toISOString(), ...args)
    }
}

@bean(LOGGER)
@profile("release")
class ReleaseLogger{    
    info(...args){
        //do nothing or send logs
    }
}
```
2. Define active profile in BeanProvider
```jsx harmony
<BeanProvider activeProfile="debug"><App/></BeanProvider>
```
! Keep the decorators in order: @bean @profile class !

## See full example in ./example
just clone repo & npm i & npm start
        
