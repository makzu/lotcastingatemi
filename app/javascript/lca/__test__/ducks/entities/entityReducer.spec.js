// @flow
import reducer, { defaultState } from 'ducks/entities'

describe('entity reducer', () => {
  it('should return the initial state', () => {
    // $FlowThisIsOkayISwear
    expect(reducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('should handle cable updates', () => {
    expect(
      // $FlowThisIsOkayISwear
      reducer(
        {
          ...defaultState,
          characters: {
            [1]: {
              id: 1,
              name: 'Test Character',
              abil_war: 2,
            },
          },
        },
        {
          type: 'lca/cable/RECEIVED',
          payload: {
            id: 1,
            type: 'character',
            event: 'update',
            changes: { abil_war: 3 },
          },
        }
      )
    ).toEqual({
      ...defaultState,
      characters: {
        [1]: {
          id: 1,
          name: 'Test Character',
          abil_war: 3,
        },
      },
    })
  })
})
