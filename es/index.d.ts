import { Reducer, AnyAction } from 'redux';
import { Command, AnyCommandCreator } from 'command-bus';
export declare type Patch<S, A> = (state: S, action: Command<A>) => S;
export declare type ReducerMap<S> = {
    [key: string]: Reducer<S>;
};
export declare type PatchTarget<T> = AnyCommandCreator<T> | AnyCommandCreator<T>[];
export declare function caseOf<S, A>(target: PatchTarget<A>, patch: Patch<S, A>): ReducerMap<S>;
export declare function createReducer<S>(init: () => S): (...maps: ReducerMap<S>[]) => Reducer<S, AnyAction>;
