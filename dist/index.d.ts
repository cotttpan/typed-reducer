import { Reducer } from 'redux';
import { Command, CommandCreator, EmptyCommandCreator } from 'command-bus';
export declare type AnyCommandCreator<T = undefined> = CommandCreator<T> | EmptyCommandCreator;
export declare type Patch<S, A> = (state: S, aciton: Command<A>) => S;
export interface ReducerMap<S> {
    [key: string]: Reducer<S>;
}
export declare type InitialStateFactory<S> = () => S;
export declare function caseOf<S, A>(commandCreator: AnyCommandCreator<A> | AnyCommandCreator<A>[], patch: Patch<S, A>): ReducerMap<S>;
export declare function createReducer<S>(init: InitialStateFactory<S>): (...patchMaps: ReducerMap<S>[]) => Reducer<S>;
