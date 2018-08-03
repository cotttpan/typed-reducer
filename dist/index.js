"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ensureArray(src) {
    return Array.isArray(src) ? src : [src];
}
function getType(src) {
    return typeof src === 'string' ? src : src.type;
}
function caseOf(target, patch) {
    const reducerMap = {};
    for (const creator of ensureArray(target)) {
        reducerMap[getType(creator)] = patch;
    }
    return reducerMap;
}
exports.caseOf = caseOf;
function createReducer(init) {
    return (...maps) => {
        const map = Object.assign({}, ...maps);
        const i = typeof init === 'function' ? init : () => init;
        return (state = i(), action) => {
            const patch = map[action.type];
            return patch ? patch(state, action) : state;
        };
    };
}
exports.createReducer = createReducer;
//# sourceMappingURL=index.js.map