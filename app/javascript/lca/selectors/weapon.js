import createCachedSelector from 're-reselect'

import { getPenalties, getAllAbilitiesWithCharmsForCharacter } from '.'
import * as calc from '../utils/calculated'

const getWeapon = (state, id) => state.entities.weapons[id]
const getCharacterForWeapon = (state, id) => state.entities.characters[getWeapon(state, id).character_id]
const getPenaltiesForWeapon = (state, id) => getPenalties(state, state.entities.characters[state.entities.weapons[id].character_id].id)
const getCharmsForWeapon = (state, id) => getAllAbilitiesWithCharmsForCharacter(state, getCharacterForWeapon(state, id).id)

export const getPoolsForWeapon = createCachedSelector(
  [getCharacterForWeapon, getWeapon, getPenaltiesForWeapon, getCharmsForWeapon],
  (character, weapon, penalties, charmAbils) => ({
    name: weapon.name,
    witheringAttack: calc.witheringAttackPool(character, weapon, penalties, charmAbils),
    witheringDamage: calc.witheringDamage(character, weapon),
    decisiveAttack: calc.decisiveAttackPool(character, weapon, penalties, charmAbils),
    parry: calc.parry(character, weapon, penalties, charmAbils),
    rangedWitheringAttack: calc.rangedWitheringAttackPool(character, weapon, penalties, charmAbils),
  })
)((state, id) => state.entities.weapons[id].id)

// This is absurd
export const sortByParry = (weaponA, weaponB) => {
  const parryA = weaponA.parry
  const parryB = weaponB.parry
  const specialtiesA = parryA.specialties
  const specialtiesB = parryB.specialties

  if      (parryA.total > parryB.total) { return -1 }
  else if (parryA.total < parryB.total) { return  1 }
  else if (parryA.excellency > parryB.excellency) { return -1 }
  else if (parryA.excellency < parryB.excellency) { return  1 }
  else if (specialtiesA.length > specialtiesB.length) { return -1 }
  else if (specialtiesA.length < specialtiesB.length) { return  1 }
  else if ( parryA.shield && !parryB.shield) { return -1 }
  else if (!parryA.shield &&  parryB.shield) { return  1 }
  else { return 0 }
}
