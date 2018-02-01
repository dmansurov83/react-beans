import React from 'react';
import PropTypes from 'prop-types';

const beansClasses = {};

const bean = (name) => (target) => {
    const regName = name || target;
    if (beansClasses[regName]) {
        throw new Error(`trying to register already defined bean "${regName}"`);
    } else {
        beansClasses[regName] = target;
    }
};

function componentWrapper(WrappedComponent, keys = []) {
    class ClassWithBeans extends React.Component {
        static contextTypes = {
            beans: PropTypes.object,
            beansInst: PropTypes.object,
        };

        constructor(props, context) {
            super(props, context);
            this.beans = {};
            const self = this;
            keys.forEach((key) => {
                self.beans[key] = self.context.beans[key];
            });
        }

        render() {
            return <WrappedComponent {...this.props} {...this.beans}/>;
        }
    }

    return ClassWithBeans;
}

function classWrapper(WrappedClass, keys = []) {
    const p = WrappedClass.prototype;
    keys.forEach((key) => {
        p[key] = function () {
            return this.beansContext.beans[key]();
        };
    });
}

const connectBeans = function (...beans) {
    return function (target) {
        const isReact = React.Component.isPrototypeOf(target) || React.PureComponent.isPrototypeOf(target);
        return isReact ? componentWrapper(target, beans) : classWrapper(target, beans);
    };
};

const createBeans = (context) => {
    const beans = {};
    for (const key in beansClasses) {
        beans[key] = () => {
            if (!context.beansInst) {
                context.beansInst = {};
            }
            let inst = context.beansInst[key];
            if (!inst) {
                inst = context.beansInst[key] = new beansClasses[key]();
                inst.beansContext = context;
            }
            return inst;
        };
    }
    return beans;
};

export {bean, createBeans, connectBeans};
