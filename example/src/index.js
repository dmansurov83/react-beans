import React from 'react';
import ReactDOM from 'react-dom';
import BeanProvider from '../../src/BeanProvider';
import App from './app/App';

const ACTIVE_PROFILE='debug'; //take from build env

const nonBean = {
    exampleValue: 'exampleValue',
}

ReactDOM.render(
    <BeanProvider
        activeProfile={ACTIVE_PROFILE}
        nonBean={nonBean}>
        <App />
    </BeanProvider>, document.getElementById('root'));