import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'
import * as calc from '../utils/calculated/'

const getState = (state) => state
const getCurrentPlayer = (state) => state.entities.players[state.session.id]

export const getSpecificQc = (state, id) => state.entities.qcs[id]
const qcIdMemoizer = (state, id) => id

const getQcMerits = (state) => state.entities.qc_merits
export const getMeritsForQc = createCachedSelector(
  [getSpecificQc, getQcMerits],
  (qc, merits) => qc.qc_merits.map((m) => merits[m])
)(qcIdMemoizer)

export const getQcAttacks = (state) => state.entities.qc_attacks
export const getAttacksForQc = createCachedSelector(
  [getSpecificQc, getQcAttacks],
  (qc, attacks) => qc.qc_attacks.map((m) => attacks[m])
)(qcIdMemoizer)

export const getQcCharms = (state) => state.entities.qc_charms
export const getCharmsForQc = createCachedSelector(
  [getSpecificQc, getQcCharms],
  (qc, charms) => qc.qc_charms.map((m) => charms[m])
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
      guile: calc.qcRating(qc, qc.guile, penalties.wound),
      resolve: calc.qcRating(qc, qc.resolve, penalties.wound),
      appearance: calc.appearanceRating({ attr_appearance: qc.appearance }, meritNames),

      evasion: calc.qcRating(qc, qc.evasion, penalties.wound + penalties.onslaught, tiny),
      parry: calc.qcRating(qc, qc.evasion, penalties.wound + penalties.onslaught),
      senses: calc.qcRating(qc, qc.senses, penalties.wound),
    }
  }
)(qcIdMemoizer)

export const canIEditQc = createSelector(
  [getCurrentPlayer, getSpecificQc, getState],
  (player, character, state) => {
    if (player.id === character.player_id)
      return true

    if (
      character.chronicle_id &&
      state.entities.chronicles[character.chronicle_id] &&
      state.entities.chronicles[character.chronicle_id].st_id === player.id
    )
      return true

    return false
  }
)

export const canIDeleteQc = createSelector(
  [getCurrentPlayer, getSpecificQc],
  (player, character) => (player.id === character.player_id)
)
