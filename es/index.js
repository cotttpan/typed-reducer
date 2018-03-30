function ensureArray(src) {
    return Array.isArray(src) ? src : [src];
}
export function caseOf(target, patch) {
    const reducerMap = {};
    for (const creator of ensureArray(target)) {
        reducerMap[creator.type] = patch;
    }
    return reducerMap;
}
export function createReducer(init) {
    return (...patchMaps) => {
        const initialState = init();
        const patchMap = Object.assign({}, ...patchMaps);
        return (state = initialState, action) => {
            const patch = patchMap[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
//# sourceMappingURL=index.js.map