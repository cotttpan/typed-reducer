import { Reducer, AnyAction } from 'redux'
import { Command, AnyCommandCreator } from 'command-bus'

export type ReturnTypeOnArrayFuncs<T> = T extends ((...val: any[]) => infer R)[] ? R : never

export type Patch<S, T extends Command> = (state: S, command: T) => S

export type ReducerMap<S> = { [key: string]: Reducer<S> }

export type Target = AnyCommandCreator | AnyCommandCreator[] | string

export type PSource<T> =
  T extends AnyCommandCreator ? ReturnType<T> :
  T extends AnyCommandCreator[] ? ReturnTypeOnArrayFuncs<T> :
  T extends string ? any :
  never

function ensureArray<T>(src: T | T[]) {
  return Array.isArray(src) ? src : [src]
}

function getType(src: string | AnyCommandCreator) {
  return typeof src === 'string' ? src : src.type
}

export function caseOf<S, T extends Target>(target: T, patch: Patch<S, PSource<T>>) {
  const reducerMap: ReducerMap<S> = {}
  for (const creator of ensureArray(target)) {
    reducerMap[getType(creator as any)] = patch as Reducer<S>
  }
  return reducerMap
}

export function createReducer<S>(init: (() => S) | S) {
  return (...maps: ReducerMap<S>[]): Reducer<S> => {
    const map: ReducerMap<S> = Object.assign({}, ...maps)
    const i = typeof init === 'function' ? init : () => init
    return (state = i(), action: AnyAction) => {
      const patch = map[action.type]
      return patch ? patch(state, action) : state
    }
  }
}
