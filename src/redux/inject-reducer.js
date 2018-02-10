let staticReducers = {};
let combineFn = () => {};

const combineInjectableReducers = (combiner, reducers) => {
    combineFn = combiner;
    staticReducers = reducers;
    return combineFn(reducers)
};

const getReducers = injection => {
    return combineFn({
        ...staticReducers,
        ...injection
    })
};

const injectReducer = (ctx, key, reducer) => {
    if (!ctx.injectedReducers) ctx.injectedReducers = {};
    ctx.injectedReducers[key] = reducer;
    ctx.store.replaceReducer(getReducers(ctx.injectedReducers));
};

export {injectReducer, combineInjectableReducers};
