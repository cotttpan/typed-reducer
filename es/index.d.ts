import { Reducer, AnyAction } from 'redux';
import { Command, AnyCommandCreator } from 'command-bus';
export declare type Patch<S, A> = (state: S, aciton: Command<A>) => S;
export declare type ReducerMap<S> = {
    [key: string]: Reducer<S>;
};
export declare type PatchTarget<T> = AnyCommandCreator<T> | AnyCommandCreator<T>[];
export declare type InitialStateFactory<S> = () => S;
export declare function caseOf<S, A>(target: PatchTarget<A>, patch: Patch<S, A>): ReducerMap<S>;
export declare function createReducer<S>(init: InitialStateFactory<S>): (...patchMaps: ReducerMap<S>[]) => Reducer<S, AnyAction>;
