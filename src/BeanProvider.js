import React from 'react';
import PropTypes from 'prop-types';
import {getBeanInstance} from "./beans";

export default class BeanProvider extends React.Component{
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = {
        getBeanInstance: PropTypes.func.isRequired,
        beansInst: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.beansContext = {
            beansInst:{
                ...props
            }
        };
        this.beansContext.getBeanInstance = (key) => getBeanInstance(this.beansContext, key)
    }

    getChildContext() {
        return this.beansContext;
    }

    render() {
        return React.Children.only(this.props.children);
    }
}