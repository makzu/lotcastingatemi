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
      parry: calc.qcRating(qc, qc.parry, penalties.wound + penalties.onslaught),
      senses: calc.qcRating(qc, qc.senses, penalties.wound),
    }
  }
)(qcIdMemoizer)

export const doIOwnQc = createSelector(
  [getCurrentPlayer, getSpecificQc],
  (player, qc) => qc !== undefined && player.id === qc.player_id
)

export const amIStOfQc = createSelector(
  [getCurrentPlayer, getSpecificQc, getState],
  (player, qc, state) => (
    qc !== undefined &&
    qc.chronicle_id &&
    state.entities.chronicles[qc.chronicle_id] &&
    state.entities.chronicles[qc.chronicle_id].st_id === player.id
  )
)
export const canISeeQc = createSelector(
  [getSpecificQc, doIOwnQc, amIStOfQc],
  (qc, doI, amI) => !qc.hidden || doI || amI
)

export const canIEditQc = createSelector(
  [doIOwnQc, amIStOfQc],
  (doI, amI) => doI || amI
)

export const canIDeleteQc = createSelector(
  [doIOwnQc],
  (doI) => doI
)
