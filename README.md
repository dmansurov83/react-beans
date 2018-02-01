# react-beans
##React dependency injection library

Usage:

1. Wrap your app with BeanProvider component:
```jsx harmony
        <BeanProvider><App/><BeanProvider>
```    
2. Resister your bean services:
* with decorators:
```jsx harmony
@bean("super")
export default class SuperService{
    doAction = () => "ActionResult"
}
```
or 
```jsx harmony
bean("super")(SuperService)
```
3. Inject:
* to component
```jsx harmony
@connectBeans("super")
class About extends Component {

    componentDidMount(){
        const result = this.props.super().doAction();
    }
    ...
}
```
* to other service
```jsx harmony
@connectBeans("Super")
class NotSuperService {
    alert = () => {
        const result = this.super().doAction();
        alert(result)
    }
}
```      
        