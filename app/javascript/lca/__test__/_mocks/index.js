import { gen } from 'testcheck'
import { ABILITY_NAMES } from '../../utils/constants.js'
export const SEED = 5 * 684 /* Number of pages in the 3e core book */

export const genHealthLevels = {
  health_level_0s: gen.posInt,
  health_level_1s: gen.posInt,
  health_level_2s: gen.posInt,
  health_level_4s: gen.posInt,
  health_level_incap: gen.posInt,
  damage_bashing: gen.posInt,
  damage_lethal: gen.posInt,
  damage_aggravated: gen.posInt,
}
export const genAbilities = {
  abil_archery: gen.posInt,
  abil_athletics: gen.posInt,
  abil_awareness: gen.posInt,
  abil_brawl: gen.posInt,
  abil_bureaucracy: gen.posInt,
  abil_dodge: gen.posInt,
  abil_integrity: gen.posInt,
  abil_investigation: gen.posInt,
  abil_larceny: gen.posInt,
  abil_linguistics: gen.posInt,
  abil_lore: gen.posInt,
  abil_medicine: gen.posInt,
  abil_melee: gen.posInt,
  abil_occult: gen.posInt,
  abil_performance: gen.posInt,
  abil_presence: gen.posInt,
  abil_resistance: gen.posInt,
  abil_ride: gen.posInt,
  abil_sail: gen.posInt,
  abil_socialize: gen.posInt,
  abil_stealth: gen.posInt,
  abil_survival: gen.posInt,
  abil_thrown: gen.posInt,
  abil_war: gen.posInt,
  abil_craft: gen.array({ craft: gen.string, rating: gen.posInt }),
  abil_martial_arts: gen.array({ style: gen.string, rating: gen.posInt }),
}

export const genCharacter = {
  name: gen.string,
  ...genHealthLevels,
  type: 'Character',
  attr_strength: gen.sPosInt,
  attr_dexterity: gen.sPosInt,
  attr_stamina: gen.sPosInt,
  attr_charisma: gen.sPosInt,
  attr_manipulation: gen.sPosInt,
  attr_appearance: gen.sPosInt,
  attr_perception: gen.sPosInt,
  attr_intelligence: gen.sPosInt,
  attr_wits: gen.sPosInt,
  ...genAbilities,
  specialties: gen.array({
    context: gen.string,
    ability: gen.oneOf([''].concat(ABILITY_NAMES))
  }),

  armor_name: gen.string,
  armor_weight: gen.oneOf(['unarmored', 'light', 'medium', 'heavy']),
  armor_is_artifact: gen.boolean,
  armor_tags: gen.array(gen.string),
  merits: gen.uniqueArray(gen.intWithin(1, 15), { minSize: 2 }),
  spells: gen.uniqueArray(gen.intWithin(1, 5), { minSize: 1, maxSize: 3 }),
}

export const mockCharacter = {
  type: 'Character',
  attr_dexterity: 3, attr_wits: 3, attr_manipulation: 3, attr_stamina: 3, attr_strength: 2,
  abil_dodge: 4,  abil_integrity: 4, abil_socialize: 4,
  abil_melee: 2,
  abil_craft: [], abil_martial_arts: [], specialties: [],
  armor_weight: 'unarmored', armor_is_artifact: false,
  health_level_0s: 1, health_level_1s: 2, health_level_2s: 2, health_level_4s: 1, health_level_incap: 1,
  damage_bashing: 0, damage_lethal: 0, damage_aggravated: 0
}
