import { Reducer, AnyAction } from 'redux'
import { Command, CommandCreator, EmptyCommandCreator } from 'command-bus'

export type AnyCommandCreator<T = undefined> = CommandCreator<T> | EmptyCommandCreator
export type Patch<S, A> = (state: S, aciton: Command<A>) => S
export interface ReducerMap<S> { [key: string]: Reducer<S> }
export type InitialStateFactory<S> = () => S

function ensureArray<T>(src: T | T[]) {
  return Array.isArray(src) ? src : [src]
}

export function caseOf<S, A>(commandCreator: AnyCommandCreator<A> | AnyCommandCreator<A>[], patch: Patch<S, A>) {
  const reducerMap: ReducerMap<S> = {}
  for (const creator of ensureArray(commandCreator)) {
    reducerMap[creator.type] = patch as Reducer<S>
  }
  return reducerMap
}

export function createReducer<S>(init: InitialStateFactory<S>) {
  return (...patchMaps: ReducerMap<S>[]): Reducer<S> => {
    const initialState = init()
    const patchMap: ReducerMap<S> = Object.assign.call(null, {}, ...patchMaps)
    return (state = initialState, action: AnyAction) => {
      const patch = patchMap[action.type]
      return patch ? patch(state, action) : state
    }
  }
}
