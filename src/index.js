import {bean, connectBeans, inject, profile, BeanScope} from "./beans";
import BeanProvider from './BeanProvider';

const withInject = connectBeans;

export {
    bean,
    BeanScope,
    connectBeans,
    withInject,
    inject,
    profile,
    BeanProvider
};
