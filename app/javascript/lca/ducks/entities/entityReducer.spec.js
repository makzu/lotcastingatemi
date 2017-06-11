import reducer from './'
import { CHA_UPDATE_SUCCESS } from './character.js'

describe('entity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      players:    {},
      chronicles: {},
      characters: {},
      weapons:    {},
      merits:     {},
      qcs:        {},
      qc_merits:  {},
      qc_attacks: {}
    })
  })

  it('should handle character/UPDATE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: CHA_UPDATE_SUCCESS,
      payload: { id: 1, abil_war: 3 },
      meta: { trait: 'abil_war' }
    })).toEqual({
      players:    {},
      chronicles: {},
      characters: { 1: { abil_war: 3 }},
      weapons:    {},
      merits:     {},
      qcs:        {},
      qc_merits:  {},
      qc_attacks: {}
    })
  })
})
