import { Reducer, AnyAction } from 'redux';
import { AnyCommand, AnyCommandCreator } from 'command-bus';
export declare type ReturnTypeOnArrayFuncs<T> = T extends ((...val: any[]) => infer R)[] ? R : never;
export declare type PatchFunc<S, T extends AnyCommand> = (state: S, command: T) => S;
export declare type ReducerMap<S> = {
    [key: string]: Reducer<S>;
};
export declare type PatchTarget = AnyCommandCreator | AnyCommandCreator[];
export declare type PatchSource<T> = T extends AnyCommandCreator ? ReturnType<T> : T extends AnyCommandCreator[] ? ReturnTypeOnArrayFuncs<T> : never;
export declare function caseOf<S, T extends PatchTarget>(target: T, patch: PatchFunc<S, PatchSource<T>>): ReducerMap<S>;
export declare function createReducer<S>(init: () => S): (...maps: ReducerMap<S>[]) => Reducer<S, AnyAction>;
