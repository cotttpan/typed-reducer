function ensureArray(src) {
    return Array.isArray(src) ? src : [src];
}
export function caseOf(commandCreator, patch) {
    const reducerMap = {};
    for (const creator of ensureArray(commandCreator)) {
        reducerMap[creator.type] = patch;
    }
    return reducerMap;
}
export function createReducer(init) {
    return (...patchMaps) => {
        const initialState = init();
        const patchMap = Object.assign.call(null, {}, ...patchMaps);
        return (state = initialState, action) => {
            const patch = patchMap[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
//# sourceMappingURL=index.js.map