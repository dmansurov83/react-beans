import React from 'react';
import PropTypes from 'prop-types';
import {getBeanInstance} from "./beans";

export default class BeanProvider extends React.Component{
    static propTypes = {
        activeProfile: PropTypes.string,
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = {
        getBeanInstance: PropTypes.func.isRequired,
        beansInst: PropTypes.object,
    };

    constructor(props){
        super(props);
        const {activeProfile, ...passedBeans} = props;
        this.beansContext = {
            beansInst:{
                ...passedBeans
            }
        };
        this.beansContext.getBeanInstance = (key) => getBeanInstance(this.beansContext, key, activeProfile)
    }

    getChildContext() {
        return this.beansContext;
    }

    render() {
        return React.Children.only(this.props.children);
    }
}