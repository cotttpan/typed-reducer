import { Reducer, AnyAction } from 'redux'
import { AnyCommand, AnyCommandCreator } from 'command-bus'

export type ReturnTypeOnArrayFuncs<T> = T extends ((...val: any[]) => infer R)[] ? R : never

export type PatchFunc<S, T extends AnyCommand> = (state: S, command: T) => S

export type ReducerMap<S> = { [key: string]: Reducer<S> }

export type PatchTarget = AnyCommandCreator | AnyCommandCreator[]

export type PatchSource<T> =
  T extends AnyCommandCreator ? ReturnType<T> :
  T extends AnyCommandCreator[] ? ReturnTypeOnArrayFuncs<T> :
  never

function ensureArray<T>(src: T | T[]) {
  return Array.isArray(src) ? src : [src]
}

export function caseOf<S, T extends PatchTarget>(target: T, patch: PatchFunc<S, PatchSource<T>>) {
  const reducerMap: ReducerMap<S> = {}
  for (const creator of ensureArray(target)) {
    reducerMap[(creator as any).type] = patch as Reducer<S>
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
