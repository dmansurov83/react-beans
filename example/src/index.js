import React from 'react';
import ReactDOM from 'react-dom';
import {BeanProvider} from '../../src';
import App from './app/App';

const ACTIVE_PROFILE='release'; //take from build env

const nonBean = {
    exampleValue: 'exampleValue',
};

ReactDOM.render(
    <BeanProvider
        activeProfile={ACTIVE_PROFILE}
        nonBean={nonBean}>
        <App />
    </BeanProvider>, document.getElementById('root'));