# react-beans
##React dependency injection library

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
@bean("example")
export default class ExampleService{
    doAction = () => "ActionResult"
}
```
or 
```jsx harmony
bean("example")(ExampleService)
```
3. Inject:
* to component
```jsx harmony
@connectBeans("example", "otherService")
class About extends Component {
    ...
    componentDidMount(){
        const result = this.props.example().doAction();
        this.props.otherService().someAction(result)
    }
    ...
}
```
* to other service
```jsx harmony
@connectBeans("example", "otherService")
class AlertService {
    postInject(){
        //calls after beans 
        this.example = this.example();
    }
        
    ...
    alert = () => {
        const result = this.example.doAction();
        this.props.otherService().someAction(result)
    }
    ...
}
```      
## Profiles
You can define which bean will be created depending on the active profile.
1. Declare beans for profiles:
```jsx harmony
@bean("log")
@profile("debug", "test")
class DebugLogger{    
    info(...args){
        console.log((new Date()).toISOString(), ...args)
    }
}

@bean("log")
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
        
