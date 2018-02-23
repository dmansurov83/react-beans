import React from 'react';
import PropTypes from 'prop-types';

const beansClasses = {};

const BeanScope = {
    SINGLETON: 'SINGLETON',
    INSTANCE: 'INSTANCE'
}
const DEFAULT_PROFILE = 'default';
const PROFILES_PROP = 'X-Bean-Profiles'

const profile = (...profiles) => (target) => {
    if (profiles && profiles.length) {
        target[PROFILES_PROP] = profiles;
    }
}

const bean = (name, scope = BeanScope.SINGLETON) => (target) => {
    const profiles = target[PROFILES_PROP] ? target[PROFILES_PROP] : [DEFAULT_PROFILE];
    profiles.forEach(profile => {
        if (!beansClasses[profile]) beansClasses[profile] = {};
        const regName = name || target.name;
        if (!regName){
            throw new Error(`Bean qualifier not specified`, target)
        }
        if (beansClasses[profile][regName]) {
            throw new Error(`trying to register already defined bean "${regName}"`);
        } else {
            beansClasses[profile][regName] = {
                scope,
                target,
            }
        }
    })
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

const getBeanInstance = (context, key, profile = DEFAULT_PROFILE) => {
    if (!context.beansInst) {
        context.beansInst = {};
    }
    if (!!context.beansInst[key]) return context.beansInst[key];
    const beanInfo = beansClasses[profile][key] || beansClasses[DEFAULT_PROFILE][key];
    if (!beanInfo) throw new Error(`Bean with qualifier <${key}> not registered for profile <${profile}>`)
    const bean = typeof beanInfo.target === 'function' ? new beanInfo.target() : beanInfo.target;
    bean.beansContext = context;
    if (bean.postInject) bean.postInject()
    if (beanInfo.scope == BeanScope.SINGLETON) {
        context.beansInst[key] = bean
    }
    return bean;
}

export { bean, profile, connectBeans, getBeanInstance };
