import React from 'react';
import ReactDOM from 'react-dom';
import {BeanProvider, createBeansContext} from '../../src';
import App from './app/App';
import {LOGGER} from "./app/services/Logger";

const ACTIVE_PROFILE = 'release'; //take from build env

const nonBean = {
    exampleValue: 'exampleValue',
};

const beansContext = createBeansContext({nonBean}, ACTIVE_PROFILE);

const logger = beansContext.getBeanInstance(LOGGER);

logger.info("ReactBeans example app started");

ReactDOM.render(
    <BeanProvider
        beansContext={beansContext}>
        <App/>
    </BeanProvider>, document.getElementById('root'));
