import { Reducer, AnyAction } from 'redux'
import { Command, AnyCommandCreator } from 'command-bus'

export type Patch<S, A> = (state: S, action: Command<A>) => S
export type ReducerMap<S> = { [key: string]: Reducer<S> }
export type PatchTarget<T> = AnyCommandCreator<T> | AnyCommandCreator<T>[]

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

export function createReducer<S>(init: () => S) {
  return (...maps: ReducerMap<S>[]): Reducer<S> => {
    const map: ReducerMap<S> = Object.assign({}, ...maps)
    return (state = init(), action: AnyAction) => {
      const patch = map[action.type]
      return patch ? patch(state, action) : state
    }
  }
}
