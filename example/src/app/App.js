import React from 'react';
import {connectBeans, inject} from '../../../src';
import {LOGGER} from "./services/Logger";
import {EXAMPLE_SERVICE2} from "./services/ExampleService2";
import {CONFIG} from "./config";

@connectBeans
export default class App extends React.Component {
    @inject(LOGGER)
    logger;
    @inject(EXAMPLE_SERVICE2)
    exampleService2;
    @inject(CONFIG)
    config;
    @inject("nonBean")
    nonBean;

    componentDidMount() {
        this.logger.info("App mounted");
    }

    render() {
        return (
            <div>
                <div>
                    Config: {this.config.api}; {this.config.configValue}
                </div>
                <div>
                    nonBean: {this.nonBean.exampleValue}
                </div>
                {this.exampleService2.action(Math.random())}
            </div>
        );
    }
}