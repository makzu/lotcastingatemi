import createCachedSelector from 're-reselect'

import { getPenalties } from '.'
import * as calc from '../utils/calculated'

const getWeapon = (state, id) => state.entities.weapons[id]
const getCharacterForWeapon = (state, id) => state.entities.characters[state.entities.weapons[id].character_id]
const getPenaltiesForWeapon = (state, id) => getPenalties(state, state.entities.characters[state.entities.weapons[id].character_id].id)

export const getPoolsForWeapon = createCachedSelector(
  [getCharacterForWeapon, getWeapon, getPenaltiesForWeapon],
  (character, weapon, penalties) => {
    return {
      witheringAttack: calc.witheringAttackPool(character, weapon, penalties),
      witheringDamage: calc.witheringDamage(character, weapon),
      decisiveAttack: calc.decisiveAttackPool(character, weapon, penalties),
      parry: calc.parry(character, weapon, penalties),
      rangedWitheringAttack: calc.rangedWitheringAttackPool(character, weapon, penalties),
    }
  }
)((state, id) => state.entities.weapons[id].id)
