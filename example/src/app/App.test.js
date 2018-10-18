import React from 'react';
import App from "./App";
import BeanProvider from "../../../src/BeanProvider";
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ReleaseLogger} from "./services/Logger";
configure({ adapter: new Adapter() });

test('ReleaseLogger should be injected', ()=>{
    const nonBean = {
        exampleValue: 'exampleValue',
    };
    const m = mount(<BeanProvider
        activeProfile={"release"}
        nonBean={nonBean}>
        <App />
    </BeanProvider>);
    const app = m.find(App).children().instance();
    const logger = app.logger;
    expect(logger.constructor.name).toBe("ReleaseLogger");
    m.unmount();
});

test('DebugLogger should be injected', ()=>{
    const nonBean = {
        exampleValue: 'exampleValue',
    };
    const m = mount(<BeanProvider
        activeProfile={"debug"}
        nonBean={nonBean}>
        <App />
    </BeanProvider>, { attachTo: document.body });
    const app = m.find(App).children().instance();
    const logger = app.logger;
    expect(logger.constructor.name).toBe("DebugLogger");
    m.unmount();
});