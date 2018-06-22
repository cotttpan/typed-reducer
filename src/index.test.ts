import { factory } from 'command-bus'
import { caseOf, createReducer } from './index'

const create = factory('')

test('createReducer with caseOf', () => {
  const INCREMENT = create<number>('INCREMENT')
  const RE_INCREMENT = create<number>('INCREMENT')
  const DECREMENT = create<number>('DECREMENT')

  const init = () => ({ count: 0 })

  const reducer = createReducer(init)(
    caseOf(
      [INCREMENT, RE_INCREMENT],
      (state, action) => ({ count: state.count + action.payload }),
    ),
    caseOf(
      DECREMENT,
      (state, action) => ({ count: state.count - action.payload }),
    ),
  )

  expect(reducer(undefined, INCREMENT(1))).toEqual({ count: 1 })
  expect(reducer(init(), INCREMENT(1))).toEqual({ count: 1 })
  expect(reducer(init(), DECREMENT(1))).toEqual({ count: -1 })
  expect(reducer(init(), RE_INCREMENT(1))).toEqual({ count: 1 })
})
