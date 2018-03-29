"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureArray(src) {
    return Array.isArray(src) ? src : [src];
}
function caseOf(commandCreator, patch) {
    const reducerMap = {};
    for (const creator of ensureArray(commandCreator)) {
        reducerMap[creator.type] = patch;
    }
    return reducerMap;
}
exports.caseOf = caseOf;
function createReducer(init) {
    return (...patchMaps) => {
        const initialState = init();
        const patchMap = Object.assign.call(null, {}, ...patchMaps);
        return (state = initialState, action) => {
            const patch = patchMap[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
exports.createReducer = createReducer;
//# sourceMappingURL=index.js.map