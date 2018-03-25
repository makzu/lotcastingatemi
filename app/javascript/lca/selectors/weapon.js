import createCachedSelector from 're-reselect'

import { getPenalties, getAllCharmsForCharacter } from '.'
import * as calc from '../utils/calculated'

const getWeapon = (state, id) => state.entities.weapons[id]
const getCharacterForWeapon = (state, id) => state.entities.characters[state.entities.weapons[id].character_id]
const getPenaltiesForWeapon = (state, id) => getPenalties(state, state.entities.characters[state.entities.weapons[id].character_id].id)
const getCharmsForWeapon = (state, id) => getAllCharmsForCharacter(state, state.entities.characters[state.entities.weapons[id].character_id].id)

export const getPoolsForWeapon = createCachedSelector(
  [getCharacterForWeapon, getWeapon, getPenaltiesForWeapon, getCharmsForWeapon],
  (character, weapon, penalties, charms) => {
    const charmAbils = [ ...new Set(charms.map((c) => c.type === 'MartialArtsCharm' ? 'martial arts' : c.ability)) ]

    return {
      witheringAttack: calc.witheringAttackPool(character, weapon, penalties, charmAbils),
      witheringDamage: calc.witheringDamage(character, weapon),
      decisiveAttack: calc.decisiveAttackPool(character, weapon, penalties, charmAbils),
      parry: calc.parry(character, weapon, penalties, charmAbils),
      rangedWitheringAttack: calc.rangedWitheringAttackPool(character, weapon, penalties, charmAbils),
    }
  }
)((state, id) => state.entities.weapons[id].id)
