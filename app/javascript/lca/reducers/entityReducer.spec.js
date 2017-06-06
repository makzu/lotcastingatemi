import reducer from './entityReducer.js'
import * as c from '../utils/actionNames'

describe('entity reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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

  it('should handle CHARACTER_UPDATE', () => {
    expect(reducer(undefined, {
      type: c.CHARACTER_UPDATE,
      id: 1,
      update: { trait: 'abil_war', value: 3 }
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
