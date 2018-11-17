import createReactContext from 'create-react-context';
import {getBeanInstance} from "./beans";

export const createBeansContext = (passedBeans, activeProfile) => {
    const beansContext = {
        beansInst: {
            ...passedBeans
        }
    };
    beansContext.getBeanInstance = (key) => getBeanInstance(beansContext, key, activeProfile);
    return beansContext;
};

export const BeansReactContext = createReactContext(createBeansContext({}, 'default'));



