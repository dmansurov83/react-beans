import React from 'react';
import {BeansReactContext} from "./context";

let registeredBeans = {};

const BeanScope = {
    SINGLETON: 'SINGLETON',
    INSTANCE: 'INSTANCE'
};

export const DEFAULT_PROFILE = 'default';

class ProfilesWrapper {
    constructor(profiles, target) {
        this.profiles = profiles;
        this.target = target;
    }
}

const profile = (...profiles) => (target) => {
    if (!(profiles && profiles.length)) throw Error('Profile(s) name missing');
    return new ProfilesWrapper(profiles, target);
};

const required = (cause) => {
    throw new Error(cause);
};

const bean = (regName = required('Empty bean name'), scope = BeanScope.SINGLETON) => (target) => {
    if (Object.values(BeanScope).indexOf(scope) === -1) {
        throw new Error('Unknown scope : ' + scope)
    }
    let profiles = [DEFAULT_PROFILE];
    if (target instanceof ProfilesWrapper) {
        profiles = target.profiles;
        target = target.target;
    }
    profiles.forEach(profile => {
        if (!registeredBeans[profile]) registeredBeans[profile] = {};
        if (registeredBeans[profile][regName]) {
            throw new Error(`trying to register already defined bean "${regName}"`);
        } else {
            registeredBeans[profile][regName] = {
                scope,
                target,
            }
        }
    });
    return target;
};

const inject = beanKey => (target, key) => {
    return {
        configurable: true,
        get() {
            const privateKey = `_bean_instance_${key}`;
            if (this[privateKey]) return this[privateKey];
            const context = this.beansContext || this.props;
            const resolveBean = context && context.getBeanInstance;
            if (!resolveBean) throw new Error(`Cant find bean resolver in ${target}`);
            this[privateKey] = resolveBean(beanKey);
            return this[privateKey];
        },
        set() {
            throw new Error(`${key} is readonly`);
        },
    };
};

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const connectBeans = function (WrappedComponent) {
    return class WithInject extends React.Component {
        static displayName = `connectBeans(${getDisplayName(WrappedComponent)})`;

        render() {
            return <BeansReactContext.Consumer>
                {({getBeanInstance}) => <WrappedComponent {...this.props} getBeanInstance={getBeanInstance}/>}
            </BeansReactContext.Consumer>
        }
    };
};

const getBeanInfo = (key = required('Key is epmty'), profile = DEFAULT_PROFILE) => {
    return (registeredBeans[profile] && registeredBeans[profile][key]) || (registeredBeans[DEFAULT_PROFILE] && registeredBeans[DEFAULT_PROFILE][key]);
};

const getBeanInstance = (context, key, profile = DEFAULT_PROFILE) => {
    if (!context.beansInst) {
        context.beansInst = {};
    }
    if (!context.getBeanInstance) {
        context.getBeanInstance = (beanKey) => getBeanInstance(context, beanKey, profile)
    }
    if (!!context.beansInst[key]) return context.beansInst[key];
    const beanInfo = getBeanInfo(key, profile);
    if (!beanInfo) throw new Error(`Bean with qualifier <${key}> not registered for profile <${profile}>`);
    let bean = beanInfo.target;
    if (typeof beanInfo.target === 'function') {
        bean = new beanInfo.target(context);
        bean.beansContext = context;
        if (bean.postInject) bean.postInject();
    }
    if (beanInfo.scope === BeanScope.SINGLETON) {
        context.beansInst[key] = bean
    }
    return bean;
};

const resetRegisteredBeans = () => registeredBeans = {};

export {bean, profile, connectBeans, getBeanInstance, inject, getBeanInfo, resetRegisteredBeans, BeanScope};
