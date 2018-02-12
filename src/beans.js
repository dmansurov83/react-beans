import React from 'react';
import PropTypes from 'prop-types';

const beansClasses = {};

const BeanScope = {
    SINGLETON: 'SINGLETON',
    INSTANCE: 'INSTANCE'
}

const bean = (name, scope = BeanScope.SINGLETON) => (target) => {
    const regName = name || target;
    if (beansClasses[regName]) {
        throw new Error(`trying to register already defined bean "${regName}"`);
    } else {
        beansClasses[regName] = {
            scope,
            target,
        }
    }
};

function componentWrapper(WrappedComponent, keys = []) {
    class ClassWithBeans extends React.Component {
        static contextTypes = {
            getBeanInstance: PropTypes.func,
            beansInst: PropTypes.object,
        };

        constructor(props, context) {
            super(props, context);
            this.beans = {};
            const self = this;
            keys.forEach((key) => {
                self.beans[key] = () => self.context.getBeanInstance(key);
            });
        }

        render() {
            return <WrappedComponent {...this.props} {...this.beans} />;
        }
    }

    return ClassWithBeans;
}

function classWrapper(WrappedClass, keys = []) {
    const p = WrappedClass.prototype;
    keys.forEach((key) => {
        p[key] = function () {
            return this.beansContext.getBeanInstance(key);
        };
    });
}

const connectBeans = function (...beans) {
    return function (target) {
        const isReact = React.Component.isPrototypeOf(target) || React.PureComponent.isPrototypeOf(target);
        return isReact ? componentWrapper(target, beans) : classWrapper(target, beans);
    };
};

const getBeanInstance = (context, key) => {
    if (!context.beansInst) {
        context.beansInst = {};
    }
    if (!!context.beansInst[key]) return context.beansInst[key];
    if (!beansClasses[key]) throw new Error(`Bean with name ${key} not registered`)
    const beanInfo = beansClasses[key];
    const bean = typeof beanInfo.target === 'function' ? new beanInfo.target() : beanInfo.target;
    bean.beansContext = context;
    if (bean.postInject) bean.postInject()
    if (beanInfo.scope == BeanScope.SINGLETON){
        context.beansInst[key] = bean
    }
    return bean;
}

export { bean, connectBeans, getBeanInstance };
