import createCachedSelector from 're-reselect'
import * as calc from '../utils/calculated/'

export const getSpecificQc = (state, id) => state.entities.qcs[id]

const qcIdMemoizer = (state, id) => state.entities.qcs[id].id

const getQcMerits = (state) => state.entities.qc_merits
export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (character, merits) => character.qc_merits.map((m) => merits[m])
)(qcIdMemoizer)

export const getPenaltiesForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc],
  (character, merits) => {
    const meritNames = merits.map((m) => m.name.toLowerCase())
    return {
      onslaught: character.onslaught,
      wound: calc.woundPenalty(character, meritNames),
    }
  }
)(qcIdMemoizer)

export const getPoolsAndRatingsForQc = createCachedSelector(
  [getSpecificQc, getMeritsForQc, getPenaltiesForQc],
  (qc, merits, penalties) => {
    const meritNames = [ ...new Set(merits.map((m) => m.name.toLowerCase())) ]
    const tiny = meritNames.some((m) => m.toLowerCase().includes('tiny creature')) ?
      [{ label: 'tiny creature', bonus: 2, situational: true }] :
      undefined

    return {
      guile: calc.qcRating(qc, qc.guile, undefined, penalties.wound),
      resolve: calc.qcRating(qc, qc.resolve, undefined, penalties.wound),
      appearance: calc.appearanceRating({ attr_appearance: qc.appearance }, meritNames),

      evasion: calc.qcRating(qc, qc.evasion, tiny, penalties.wound + penalties.onslaught),
      parry: calc.qcRating(qc, qc.evasion, undefined, penalties.wound + penalties.onslaught),
    }
  }
)(qcIdMemoizer)
