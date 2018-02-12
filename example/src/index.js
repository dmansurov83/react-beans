import React from 'react';
import ReactDOM from 'react-dom';
import BeanProvider from '../../src/BeanProvider';

import App from './app/App';

const nonBean = {
    exampleValue: 'exampleValue',
}

ReactDOM.render(<BeanProvider nonBean={nonBean}><App /></BeanProvider>, document.getElementById('root'));