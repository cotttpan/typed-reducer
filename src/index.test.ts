import { create } from 'command-bus'
import { caseOf, createReducer } from './index'


test('createReducer using caseOf', () => {
  type S = { count: number }
  const INCREMENT = create<number>('INCREMENT')
  const RE_INCREMENT = create<number>('INCREMENT')
  const DECREMENT = create<number>('DECREMENT')

  const init = () => ({ count: 0 })

  const increment = (state: S, action: { payload: number }) => ({
    ...state, count: state.count + action.payload,
  })

  const decrement = (state: S, action: { payload: number }) => ({
    ...state, count: state.count - action.payload,
  })

  const reducer = createReducer(init)(
    caseOf([INCREMENT, RE_INCREMENT], increment),
    caseOf(DECREMENT, decrement),
  )

  expect(reducer(init(), INCREMENT(1))).toEqual({ count: 1 })
  expect(reducer(init(), DECREMENT(1))).toEqual({ count: -1 })
  expect(reducer(init(), RE_INCREMENT(1))).toEqual({ count: 1 })
})
