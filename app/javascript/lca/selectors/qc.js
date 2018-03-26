import createCachedSelector from 're-reselect'
import * as calc from '../utils/calculated/'

export const getSpecificQc = (state, id) => state.entities.qcs[id]

const qcIdMemoizer = (state, id) => state.entities.qcs[id].id

const getQcMerits = (state) => state.entities.qc_merits
export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (character, merits) => character.merits.map((m) => merits[m])
)(qcIdMemoizer)

export const getPenaltiesForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc],
  (character, merits) => {
    const meritNames = merits.map((m) => m.merit_name.toLowerCase() + m.rating)
    return {
      onslaught: character.onslaught,
      wound: calc.woundPenalty(character, meritNames),
    }
  }
)(qcIdMemoizer)

export const getPoolsAndRatingsForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc, getPenaltiesForQc],
  (qc, merits, penalties) => {
    const meritNames = [ ...new Set(merits.map((m) => m.name.toLowerCase() + m.rating)) ]

    return {
      guile: calc.qcRating(qc.guile, [], penalties),
      resolve: calc.qcRating(qc.resolve, [], penalties),
      appearance: calc.appearanceRating({ attr_appearance: qc.appearance }, meritNames),

      evasion: calc.qcRating(qc.evasion, [], penalties),
      parry: calc.qcRating(qc.evasion, [], penalties)
    }
  }
)(qcIdMemoizer)
