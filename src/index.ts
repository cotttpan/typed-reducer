import { Reducer, AnyAction } from 'redux'
import { Command, AnyCommandCreator } from 'command-bus'

export type Patch<S, A> = (state: S, aciton: Command<A>) => S
export type ReducerMap<S> = { [key: string]: Reducer<S> }
export type PatchTarget<T> = AnyCommandCreator<T> | AnyCommandCreator<T>[]
export type InitialStateFactory<S> = () => S

function ensureArray<T>(src: T | T[]) {
  return Array.isArray(src) ? src : [src]
}

export function caseOf<S, A>(target: PatchTarget<A>, patch: Patch<S, A>) {
  const reducerMap: ReducerMap<S> = {}
  for (const creator of ensureArray(target)) {
    reducerMap[creator.type] = patch as Reducer<S>
  }
  return reducerMap
}

export function createReducer<S>(init: InitialStateFactory<S>) {
  return (...patchMaps: ReducerMap<S>[]): Reducer<S> => {
    const initialState = init()
    const patchMap: ReducerMap<S> = Object.assign({}, ...patchMaps)
    return (state = initialState, action: AnyAction) => {
      const patch = patchMap[action.type]
      return patch ? patch(state, action) : state
    }
  }
}
