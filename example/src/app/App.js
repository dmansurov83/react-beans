import React from 'react';
import {inject, withInject} from '../../../src';
import {LOGGER} from "./services/Logger";
import {API_SERVICE} from "./services/Api";
import {CONFIG} from "./config";

@withInject
export default class App extends React.Component {
    @inject(LOGGER)
    logger;
    @inject(API_SERVICE)
    apiService;
    @inject(CONFIG)
    config;
    @inject("nonBean")
    nonBean;

    componentDidMount() {
        this.logger.info("App mounted");
    }

    render() {
        const apiData = this.apiService.getData();
        return (
            <div>
                <div>
                    Config: {this.config.api}; {this.config.configValue}
                </div>
                <div>
                    nonBean: {this.nonBean.exampleValue}
                </div>
                {apiData.map(d => <div key={d}>{d}</div>)}
            </div>
        );
    }
}
