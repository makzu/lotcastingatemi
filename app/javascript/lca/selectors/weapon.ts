import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

import { getPenalties } from './character'
import {
  getNativeCharmsForCharacter,
  getMartialArtsCharmsForCharacter,
} from './charm'
import { entities } from './entities'
import * as calc from 'utils/calculated'
import decisiveAttack from 'utils/calculated/pools/combat/decisiveAttack'
import witheringAttack from 'utils/calculated/pools/combat/witheringAttack'
import parry from 'utils/calculated/ratings/parry'
import { WrappedEntityState } from 'ducks/entities'

const getState = (state: WrappedEntityState) => state

const getWeapon = (state: WrappedEntityState, id: number) =>
  entities(state).weapons[id]

const getCharacterForWeapon = (state: WrappedEntityState, id: number) =>
  entities(state).characters[getWeapon(state, id)?.character_id ?? 0]

const getPenaltiesForWeapon = (state: WrappedEntityState, id: number) =>
  getPenalties(state, getCharacterForWeapon(state, id)?.id ?? 0)

const getExcellencyAbilsForWeapon = createSelector(
  [getCharacterForWeapon, getState],
  (character, state) =>
    calc.excellencyAbils(
      // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
      character,
      // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
      getNativeCharmsForCharacter(state, character.id).concat(
        // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
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
    // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
    name: weapon.name,
    witheringAttack: witheringAttack(
      // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
    // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
    witheringDamage: calc.witheringDamage(character, weapon),
    decisiveAttack: decisiveAttack(
      // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
    // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
    parry: parry(character, weapon, penalties, excellencyAbils),
    rangedWitheringAttack: calc.rangedWitheringAttackPool(
      // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
      character,
      weapon,
      penalties,
      excellencyAbils,
    ),
  }),
)((state, id) => id)

// This is absurd
export const sortByParry = (
  weaponA: ReturnType<typeof getPoolsForWeapon>,
  weaponB: ReturnType<typeof getPoolsForWeapon>,
) => {
  type parryType = ReturnType<typeof getPoolsForWeapon>['parry'] & {
    specialties: string[]
    shield: boolean
  }
  const parryA = weaponA.parry as parryType
  const parryB = weaponB.parry as parryType

  const specialtiesA: string[] = parryA.specialties ?? []
  const specialtiesB: string[] = parryB.specialties ?? []

  if (parryA.total > parryB.total) {
    return -1
  } else if (parryA.total < parryB.total) {
    return 1
    // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
  } else if (parryA.excellency > parryB.excellency) {
    return -1
    // @ts-expect-error FIXME Pool/Rating/Excellency rewrite
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
