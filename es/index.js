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
    return (...maps) => {
        const map = Object.assign({}, ...maps);
        return (state = init(), action) => {
            const patch = map[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
//# sourceMappingURL=index.js.map