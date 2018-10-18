import React from 'react';
import PropTypes from 'prop-types';

const beansClasses = {};

const BeanScope = {
    SINGLETON: 'SINGLETON',
    INSTANCE: 'INSTANCE'
};

const DEFAULT_PROFILE = 'default';
const PROFILES_PROP = 'X-Bean-Profiles';

const profile = (...profiles) => (target) => {
    if (profiles && profiles.length) {
        target[PROFILES_PROP] = profiles;
    }
};

const bean = (name, scope = BeanScope.SINGLETON) => (target) => {
    const profiles = target[PROFILES_PROP] ? target[PROFILES_PROP] : [DEFAULT_PROFILE];
    profiles.forEach(profile => {
        if (!beansClasses[profile]) beansClasses[profile] = {};
        const regName = name || target.name;
        if (!regName) {
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

const inject = beanKey => (target, key) => {
    let beanInstance;
    return {
        configurable: true,
        get() {
            if (beanInstance) return beanInstance;
            const context = this.beansContext || this.props;
            const resolveBean = context && context.getBeanInstance;
            if (!resolveBean) throw new Error(`Cant find bean resolver in ${target}`);
            beanInstance = resolveBean(beanKey);
            return beanInstance;
        },
        set() {
            throw new Error(`${key} is readonly`);
        },
    };
};

function componentWrapper(WrappedComponent) {
    class ClassWithBeans extends React.Component {
        static contextTypes = {
            getBeanInstance: PropTypes.func,
        };

        render() {
            const props = {
                ...this.props,
                getBeanInstance: this.context.getBeanInstance
            };
            return <WrappedComponent {...props}/>;
        }
    }

    return ClassWithBeans;
}

const connectBeans = function (target) {
    return componentWrapper(target);
};

const getBeanInstance = (context, key, profile = DEFAULT_PROFILE) => {
    if (!context.beansInst) {
        context.beansInst = {};
    }
    if (!!context.beansInst[key]) return context.beansInst[key];
    const beanInfo = beansClasses[profile][key] || beansClasses[DEFAULT_PROFILE][key];
    if (!beanInfo) throw new Error(`Bean with qualifier <${key}> not registered for profile <${profile}>`);
    const bean = typeof beanInfo.target === 'function' ? new beanInfo.target() : beanInfo.target;
    bean.beansContext = context;
    if (bean.postInject) bean.postInject();
    if (beanInfo.scope === BeanScope.SINGLETON) {
        context.beansInst[key] = bean
    }
    return bean;
};

export {bean, profile, connectBeans, getBeanInstance, inject};
