import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'

import type { RootState } from '@lca/store'
import { excellencyAbils } from 'utils/calculated/excellencies/index'
import { decisiveAttack } from 'utils/calculated/pools/combat/decisiveAttack'
import { witheringAttack } from 'utils/calculated/pools/combat/witheringAttack'
import { witheringDamage } from 'utils/calculated/pools/combat/witheringDamage'
import { rangedWitheringAttackPool } from 'utils/calculated/pools/combat/witheringRanged'
import { parry } from 'utils/calculated/ratings/parry'
import { getPenalties } from './character'
import {
  getMartialArtsCharmsForCharacter,
  getNativeCharmsForCharacter,
} from './charm'
import { entities } from './entities'

const getState = (state: RootState) => state

const getWeapon = (state: RootState, id: number) => entities(state).weapons[id]

const getCharacterForWeapon = (state: RootState, id: number) =>
  entities(state).characters[getWeapon(state, id).character_id]

const getPenaltiesForWeapon = (state: RootState, id: number) =>
  getPenalties(state, getCharacterForWeapon(state, id).id)

const getExcellencyAbilsForWeapon = createSelector(
  [getCharacterForWeapon, getState],
  (character, state) =>
    excellencyAbils(
      character,
      getNativeCharmsForCharacter(state, character.id).concat(
        getMartialArtsCharmsForCharacter(state, character.id),
      ),
    ),
)

export const getPoolsForWeapon = createCachedSelector(
  [
    getCharacterForWeapon,
    getWeapon,
    getPenaltiesForWeapon,
    getExcellencyAbilsForWeapon,
  ],
  (character, weapon, penalties, excellencyAbils) => ({
    name: weapon.name,
    witheringAttack: witheringAttack(
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
    witheringDamage: witheringDamage(character, weapon),
    decisiveAttack: decisiveAttack(
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
    parry: parry(character, weapon, penalties, excellencyAbils),
    rangedWitheringAttack: rangedWitheringAttackPool(
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
  }),
)((_state, id) => id)

// This is absurd
export const sortByParry = (weaponA, weaponB) => {
  const parryA = weaponA.parry
  const parryB = weaponB.parry
  const specialtiesA =
    parryA.specialties === undefined ? [] : parryA.specialties
  const specialtiesB =
    parryB.specialties === undefined ? [] : parryB.specialties

  if (parryA.total > parryB.total) {
    return -1
  } else if (parryA.total < parryB.total) {
    return 1
  } else if (parryA.excellency > parryB.excellency) {
    return -1
  } else if (parryA.excellency < parryB.excellency) {
    return 1
  } else if (specialtiesA.length > specialtiesB.length) {
    return -1
  } else if (specialtiesA.length < specialtiesB.length) {
    return 1
  } else if (parryA.shield && !parryB.shield) {
    return -1
  } else if (!parryA.shield && parryB.shield) {
    return 1
  } else {
    return 0
  }
}
