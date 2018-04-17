// @flow
import reducer, { defaultState } from '../../../ducks/entities'

describe('entity reducer', () => {
  it('should return the initial state', () => {
    // $FlowThisIsOkayISwear
    expect(reducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('should handle cable updates', () => {
    expect(
      // $FlowThisIsOkayISwear
      reducer(undefined, {
        type: 'lca/cable/RECEIVED',
        payload: {
          id: 1,
          type: 'characters',
          event: 'update',
          changes: { abil_war: 3 },
        },
      })
    ).toEqual({
      ...defaultState,
      characters: { [1]: { abil_war: 3 } },
    })
  })
})
