import { Reducer, AnyAction } from 'redux';
import { Command, AnyCommandCreator } from 'command-bus';
export declare type ReturnTypeOnArrayFuncs<T> = T extends ((...val: any[]) => infer R)[] ? R : never;
export declare type Patch<S, T extends Command> = (state: S, command: T) => S;
export declare type ReducerMap<S> = {
    [key: string]: Reducer<S>;
};
export declare type Target = AnyCommandCreator | AnyCommandCreator[] | string;
export declare type PSource<T> = T extends AnyCommandCreator ? ReturnType<T> : T extends AnyCommandCreator[] ? ReturnTypeOnArrayFuncs<T> : T extends string ? any : never;
export declare function caseOf<S, T extends Target>(target: T, patch: Patch<S, PSource<T>>): ReducerMap<S>;
export declare function createReducer<S>(init: (() => S) | S): (...maps: ReducerMap<S>[]) => Reducer<S, AnyAction>;
