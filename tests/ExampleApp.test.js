import React from 'react';
import App from "../example/src/app/App";
import BeanProvider from "../src/BeanProvider";
import {shallow, mount, render, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LOGGER, ReleaseLogger} from "../example/src/app/services/Logger";
import {bean, profile} from "../src/index";

configure({adapter: new Adapter()});

test('ReleaseLogger should be injected', () => {
    const m = mount(<BeanProvider
        activeProfile={"release"}
        nonBean={"nonBean"}>
        <App/>
    </BeanProvider>);
    const app = m.find(App).children().instance();
    const logger = app.logger;
    expect(logger.constructor.name).toBe("ReleaseLogger");
    m.unmount();
});

test('DebugLogger should be injected', () => {
    const m = mount(<BeanProvider
        activeProfile={"debug"}
        nonBean={"nonBean"}>
        <App/>
    </BeanProvider>);
    const app = m.find(App).children().instance();
    expect(app.logger.constructor.name).toBe("DebugLogger");
    expect(app.nonBean).toBe("nonBean");
    m.unmount();
});

test('Test bean should be injected from test', () => {
    @bean(LOGGER)
    @profile("test")
    class TestLogger {
        logs = [];
        info(...args) {
            this.logs.push({level: 'info', time: new Date(), message: args});
        }
        error(...args) {
            this.logs.push({level: 'error', time: new Date(), message: args});
        }
    }

    const m = mount(<BeanProvider
        activeProfile={"test"}
        nonBean={"nonBean"}>
        <App/>
    </BeanProvider>);
    const app = m.find(App).children().instance();
    const {logger} = app;
    expect(logger.constructor.name).toBe("TestLogger");
    console.log(logger.logs);
    expect(logger.logs.length).toBeGreaterThan(0);
    m.unmount();
});