import reducer, { defaultState } from './'
import { CHA_UPDATE_SUCCESS } from './character.js'

describe('entity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(defaultState)
  })

  it('should handle character/UPDATE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: CHA_UPDATE_SUCCESS,
      payload: { id: 1, abil_war: 3 },
      meta: { trait: 'abil_war' }
    })).toEqual({ ...defaultState,
      characters: { 1: { abil_war: 3 }}
    })
  })
})
