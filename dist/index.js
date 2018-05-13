"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureArray(src) {
    return Array.isArray(src) ? src : [src];
}
function caseOf(target, patch) {
    const reducerMap = {};
    for (const creator of ensureArray(target)) {
        reducerMap[creator.type] = patch;
    }
    return reducerMap;
}
exports.caseOf = caseOf;
function createReducer(init) {
    return (...maps) => {
        const map = Object.assign({}, ...maps);
        return (state = init(), action) => {
            const patch = map[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
exports.createReducer = createReducer;
//# sourceMappingURL=index.js.map