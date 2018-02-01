import React from 'react';
import PropTypes from 'prop-types';
import {createBeans} from "./beans";

export default class BeanProvider extends React.Component{
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = {
        beans: PropTypes.object.isRequired,
        beansInst: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.beansContext = {};
        this.beansContext.beans = createBeans(this.beansContext)
    }

    getChildContext() {
        return this.beansContext;
    }

    render() {
        return React.Children.only(this.props.children);
    }
}