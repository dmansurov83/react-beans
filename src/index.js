import {bean, connectBeans, inject, profile, BeanScope} from "./beans";
import BeanProvider from './BeanProvider';
import {createBeansContext} from "./context";

const withInject = connectBeans;

export {
    bean,
    BeanScope,
    connectBeans,
    withInject,
    inject,
    profile,
    BeanProvider,
    createBeansContext
};
