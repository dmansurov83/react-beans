import React from 'react';
import ReactDOM from 'react-dom';
import BeanProvider from '../../src/BeanProvider';

import App from './app/App';

ReactDOM.render( <BeanProvider><App/></BeanProvider>, document.getElementById( 'root' ) );