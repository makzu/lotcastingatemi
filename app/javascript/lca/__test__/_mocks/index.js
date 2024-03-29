// @flow
import { gen } from 'testcheck'
import { ABILITY_NAMES } from 'utils/constants.ts'
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
  // $FlowFixMe
  abil_craft: gen.array(({ craft: gen.string, rating: gen.posInt }: Object)),
  // $FlowFixMe
  abil_martial_arts: gen.array(
    ({ style: gen.string, rating: gen.posInt }: Object),
  ),
}

export const genMortal = {
  name: gen.string,
  ...genHealthLevels,
  type: 'Character',
  essence: gen.sPosInt,
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
  // $FlowFixMe
  specialties: gen.array(
    ({
      context: gen.string,
      ability: gen.oneOf([''].concat(ABILITY_NAMES)),
    }: Object),
  ),

  armor_name: gen.string,
  armor_weight: gen.oneOf(['unarmored', 'light', 'medium', 'heavy']),
  armor_is_artifact: gen.boolean,
  // $FlowFixMe
  armor_tags: gen.array(gen.string),
  onslaught: gen.posInt,
  poisons: [],
  bonus_hardness: 0,
  bonus_soak: 0,
  bonus_mobility_penalty: 0,
}

export const genAbilityExalt = {
  ...genMortal,
  // $FlowFixMe
  caste_abilities: gen.array(gen.oneOf(ABILITY_NAMES)),
  // $FlowFixMe
  favored_abilities: gen.array(gen.oneOf(ABILITY_NAMES)),
  anima_level: 3,
}

export const genSolar = {
  ...genAbilityExalt,
  type: 'SolarCharacter',
  exalt_type: 'solar',
  excellency: 'solar',
  supernal_ability: gen.oneOf(ABILITY_NAMES),
  caste: gen.oneOf(['dawn', 'zenith', 'twilight', 'night', 'eclipse']),
  charms: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ],
  martial_arts_charms: [26],
}

export const mockCharacter = {
  type: 'Character',
  exalt_type: 'mortal',
  attr_dexterity: 3,
  attr_wits: 3,
  attr_manipulation: 3,
  attr_stamina: 3,
  attr_strength: 2,
  abil_archery: 0,
  abil_athletics: 0,
  abil_awareness: 0,
  abil_brawl: 0,
  abil_bureaucracy: 0,
  abil_dodge: 4,
  abil_integrity: 4,
  abil_investigation: 0,
  abil_larceny: 0,
  abil_linguistics: 0,
  abil_lore: 0,
  abil_medicine: 0,
  abil_melee: 2,
  abil_occult: 0,
  abil_performance: 0,
  abil_presence: 0,
  abil_resistance: 0,
  abil_ride: 0,
  abil_sail: 0,
  abil_socialize: 4,
  abil_stealth: 0,
  abil_survival: 0,
  abil_thrown: 0,
  abil_war: 0,
  abil_craft: [],
  abil_martial_arts: [],
  specialties: [],
  armor_name: 't-shirt',
  armor_weight: 'unarmored',
  armor_is_artifact: false,
  armor_tags: [],
  health_level_0s: 1,
  health_level_1s: 2,
  health_level_2s: 2,
  health_level_4s: 1,
  health_level_incap: 1,
  damage_bashing: 0,
  damage_lethal: 0,
  damage_aggravated: 0,
  initiative: 0,
  onslaught: 0,
  bonus_hardness: 0,
  bonus_soak: 0,
  bonus_mobility_penalty: 0,
}
