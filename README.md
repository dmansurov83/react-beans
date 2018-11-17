# react-beans
# 0.1.0 critical api changes:
- all injections by property @inject now.
- @connectBeans now only for react components, otherwise it causes an error;
- @connectBeans now without args;
## React dependency injection library

### Usage:

#### 1. Wrap your app with BeanProvider component:
```jsx harmony
        <BeanProvider>
            <App/>
        <BeanProvider>
```    
#### 2. Register your bean services:
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

#### or register as builder
```jsx harmony
bean("ExampleService1")((beansContext) => 
    new ExampleService("init example service 1"));
bean("ExampleService2")((beansContext) => 
    new ExampleService("init example service 2"));
```
this approach allow you to inject dependencies to the constructor
```jsx harmony
bean("logger")(Logger);
bean("ExampleService")(({getBeanInstance}) => 
    new ExampleService(getBeanInstance("logger")));
```


#### 3. Inject:

**important**: js files should be imported to be added to the chunk

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
**Keep the decorators in order: @bean @profile class**

## Testing
You can use test profile to define beans (e.g. data mocks)

Jest example:
```jsx harmony
test('Test bean should be injected from test', () => {
    @bean(LOGGER)
    @profile("test")
    class TestLogger {
        logs = [];
        info(...args) {
            this.logs.push({level: 'info', time: new Date(), message: args});
        }
        error(...args) {
            this.logs.push({level: 'error', time: new Date(), message: args});
        }
    }

    const m = mount(<BeanProvider
        activeProfile={"test"}
        nonBean={"nonBean"}>
        <App/>
    </BeanProvider>);
    const app = m.find(App).children().instance();
    const {logger} = app;
    expect(logger.constructor.name).toBe("TestLogger");
    console.log(logger.logs);
    expect(logger.logs.length).toBeGreaterThan(0);
    m.unmount();
});
```
## p.s
In some cases you should able to get some bean instance before your 
app component rendered.

You can create beans context and get bean instance from it.
And then pass it to the BeanProvider component.

example:
```jsx harmony
import config from './config';
import {createBeansContext, BeanProvider} from 'react-beans';

//createBeansContext(predefinedBeanInstances, activeProfile = default)
const beansContext = createBeansContext({config});

const logger = beansContext.getBeanInstance('logger');
logger.info('App started');

ReactDOM.render(
    <BeanProvider
        beansContext={beansContext}>
        <App/>
    </BeanProvider>, document.getElementById('root'));
```



## See full example in ./example
just clone repo & npm i & npm start
        
