import React from 'react';
import ReactDOM from 'react-dom';
import BeanProvider from '../../src/BeanProvider';

import App from './app/App';

const config = {
    exampleConfigValue: 'exampleConfigValue',
}

ReactDOM.render(<BeanProvider config={config}><App /></BeanProvider>, document.getElementById('root'));