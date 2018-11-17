import React from 'react';
import PropTypes from 'prop-types';
import {BeansReactContext, createBeansContext} from "./context";

export default class BeanProvider extends React.Component {
    static propTypes = {
        activeProfile: PropTypes.string,
        children: PropTypes.element.isRequired,
        beansContext: PropTypes.object,
    };

    constructor(props) {
        super(props);
        const {activeProfile, beansContext, ...passedBeans} = props;
        this.beansContext = beansContext || createBeansContext(passedBeans, activeProfile)
    }

    render() {
        return <BeansReactContext.Provider value={this.beansContext}>
            {this.props.children}
        </BeansReactContext.Provider>;
    }
}
