import React from 'react';
import { connectBeans } from '../../../src/beans';
import './services/ExampleService';
import './services/ExampleService2';
import './services/Logger';
import './config';

@connectBeans("log", "example2", "config", "nonBean")
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
    const config = this.props.config();
    const nonBean = this.props.nonBean();
    return (
      <div>
          <div>
            Config: {config.api}; {config.configValue}
          </div>
          <div>
            nonBean: {nonBean.exampleValue}
          </div>
          {this.exampleService2.action(Math.random())}
      </div>
    );
  }
}