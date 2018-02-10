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
## See full example in ./example
just clone repo & npm i & npm start
        
