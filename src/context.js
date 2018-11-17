import createReactContext from 'create-react-context';
import {DEFAULT_PROFILE, getBeanInstance} from "./beans";

export const createBeansContext = (passedBeans = {}, activeProfile = DEFAULT_PROFILE) => {
    const beansContext = {
        beansInst: {
            ...passedBeans
        }
    };
    beansContext.getBeanInstance = (key) => getBeanInstance(beansContext, key, activeProfile);
    return beansContext;
};

export const BeansReactContext = createReactContext(createBeansContext());



