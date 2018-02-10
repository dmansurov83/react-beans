import React from 'react';
import { connectBeans } from '../../../src/beans';
import './services/ExampleService';
import './services/ExampleService2';
import './services/Logger';

@connectBeans("log", "example2")
export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.logger = props.log();
    this.exampleService2 = props.example2(); 
  }

  componentDidMount(){
      this.logger.info("App mounted")
  }

  render() {
    return (
      <div>
          {this.exampleService2.action(Math.random())}
      </div>
    );
  }
}