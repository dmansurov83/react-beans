import {inject, bean, getBeanInfo, getBeanInstance, resetRegisteredBeans, BeanScope, profile} from "../src/beans";

beforeEach(() => {
    resetRegisteredBeans();
});

test('bean should be registered', () => {
    const beanName = "testBean";
    const beanValue = "beanValue";
    bean(beanName)(beanValue);
    const info = getBeanInfo("testBean");
    expect(!!info).toBe(true);
    expect(info.target).toBe(beanValue);
    const info2 = getBeanInfo("unknownBean");
    expect(!!info2).toBe(false);
    expect(() => getBeanInfo()).toThrow();
});

test('@profile should return wrapper', () => {
    const bean = "test";
    const wrapper = profile("release", "debug")(bean);
    expect(wrapper.target).toBe(bean);
    expect(wrapper.profiles).toEqual(["release", "debug"]);
    expect(() => profile()(bean)).toThrow()
});

test('registering bean without name should throw error', () => {
    expect(() => bean()("any")).toThrow(Error);
});

test('registering second bean with same name should throw error', () => {
    const beanName = "testBean";
    bean(beanName)("any");
    expect(() => bean(beanName)("any2")).toThrow(Error);
});

test('bean class instance should be created by getBeanInstance', () => {
    const beanName = "testBean";

    @bean(beanName)
    class TestClass {
        test() {
            return "tst";
        }
    }

    const context = {};
    const instance = getBeanInstance(context, beanName);
    expect(!!instance).toBe(true);
    expect(instance.test()).toBe("tst")
});

test('bean with scope INSTANCE should be a new every injection', () => {
    const beanName = "testBean";

    @bean(beanName, BeanScope.INSTANCE)
    class TestClass {
        test() {
            return "tst";
        }
    }

    const context = {};
    const instance = getBeanInstance(context, beanName);
    const instance2 = getBeanInstance(context, beanName);
    expect(instance === instance2).toBe(false);
});

test('bean with scope SINGLETON(default) should be same every injection', () => {
    const beanName = "testBean";

    @bean(beanName)
    class TestClass {
        test() {
            return "tst";
        }
    }

    const context = {};
    const instance = getBeanInstance(context, beanName);
    const instance2 = getBeanInstance(context, beanName);
    expect(instance === instance2).toBe(true);
});

test('registering bean with unknown scope should cause error', () => {
    expect(() => bean("testBean", "UNKNOWN_SCOPE")("test")).toThrow(Error);
});

test('bean should be injected', () => {
    const bean1 = "testBean1";

    @bean(bean1)
    class TestClass {
        test() {
            return "tst";
        }
    }

    const bean2 = "testBean2";

    @bean(bean2)
    class TestClass2 {
        @inject(bean1)
        test1;

        test2() {
            return this.test1.test();
        }
    }

    const context = {};
    const instance = getBeanInstance(context, bean2);
    expect(!!instance).toBe(true);
    expect(instance.test2()).toBe("tst")
});

test(`resolving not registered bean should cause an error`, () => {
    expect(() => getBeanInstance({}, "any")).toThrow()
});

test('access to @inject property in non-bean class should cause an error', () => {
    class Test {
        @inject("any")
        bean
    }

    const test = new Test();
    expect(() => test.bean).toThrow();
});

test('beans for different profiles should be different', () => {
    const beanName = "test";
    const releaseProfile = "release";
    const debugProfile = "debug";
    const releaseBean = "releaseBean";
    const debugBean = "debugBean";
    bean(beanName)(profile(releaseProfile)(releaseBean));
    bean(beanName)(profile(debugProfile)(debugBean));
    const releaseInstance = getBeanInstance({}, beanName, releaseProfile);
    const debugInstance = getBeanInstance({}, beanName, debugProfile);
    expect(releaseInstance).toBe(releaseBean);
    expect(debugInstance).toBe(debugBean);
});

test('set injected property value should cause error', () => {
    const bean1 = "testBean1";

    @bean(bean1)
    class TestClass {
        test() {
            return "tst";
        }
    }

    const bean2 = "testBean2";

    @bean(bean2)
    class TestClass2 {
        @inject(bean1)
        test1;

        setAnyInjectedProperty() {
            this.test1 = "any"
        }
    }

    const context = {};
    const instance = getBeanInstance(context, bean2);
    expect(!!instance).toBe(true);
    expect(() => instance.setAnyInjectedProperty()).toThrow(Error);
});

test('postInject should be called after inject', () => {
    @bean("test")
    class Test {
        postInject() {
            this.postInjectCalled = true;
        }
    }

    const instance = getBeanInstance({}, "test");
    expect(instance.postInjectCalled).toBe(true);
});

test('beans should able to be registered as builder function', () => {
    class Test {
        constructor(field) {
            this.field = field;
        }
    }

    bean("q1")(() => new Test("q1"));
    bean("q2")(() => new Test("q2"));
    const context = {};
    const q1 = getBeanInstance(context, "q1");
    const q2 = getBeanInstance(context, "q2");
    expect(q1.field).toBe("q1");
    expect(q2.field).toBe("q2");
});

test('builder should able to inject dependency to constructor', () => {
    class Test {
        constructor(config) {
            this.config = config;
        }
    }

    const config = {version: 1};

    bean("config")(config);
    bean("test")(({getBeanInstance: inject}) => new Test(inject("config")));
    const test = getBeanInstance({}, "test");
    expect(test.config).toBe(config);
});
