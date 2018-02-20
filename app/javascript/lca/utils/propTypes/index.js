import PropTypes from 'prop-types'

export const withHealthLevels = {
  health_level_0s:    PropTypes.number.isRequired,
  health_level_1s:    PropTypes.number.isRequired,
  health_level_2s:    PropTypes.number.isRequired,
  health_level_4s:    PropTypes.number.isRequired,
  health_level_incap: PropTypes.number.isRequired,
  damage_bashing:     PropTypes.number.isRequired,
  damage_lethal:      PropTypes.number.isRequired,
  damage_aggravated:  PropTypes.number.isRequired
}

export const withWillpower = {
  willpower_temporary: PropTypes.number.isRequired,
  willpower_permanent: PropTypes.number.isRequired
}

export const withAttributes = {
  attr_strength:     PropTypes.number.isRequired,
  attr_dexterity:    PropTypes.number.isRequired,
  attr_stamina:      PropTypes.number.isRequired,
  attr_charisma:     PropTypes.number.isRequired,
  attr_manipulation: PropTypes.number.isRequired,
  attr_appearance:   PropTypes.number.isRequired,
  attr_perception:   PropTypes.number.isRequired,
  attr_intelligence: PropTypes.number.isRequired,
  attr_wits:         PropTypes.number.isRequired
}

export const withAbilities = {
  abil_archery:       PropTypes.number.isRequired,
  abil_athletics:     PropTypes.number.isRequired,
  abil_awareness:     PropTypes.number.isRequired,
  abil_brawl:         PropTypes.number.isRequired,
  abil_bureaucracy:   PropTypes.number.isRequired,
  abil_dodge:         PropTypes.number.isRequired,
  abil_integrity:     PropTypes.number.isRequired,
  abil_investigation: PropTypes.number.isRequired,
  abil_larceny:       PropTypes.number.isRequired,
  abil_linguistics:   PropTypes.number.isRequired,
  abil_lore:          PropTypes.number.isRequired,
  abil_medicine:      PropTypes.number.isRequired,
  abil_melee:         PropTypes.number.isRequired,
  abil_occult:        PropTypes.number.isRequired,
  abil_performance:   PropTypes.number.isRequired,
  abil_presence:      PropTypes.number.isRequired,
  abil_resistance:    PropTypes.number.isRequired,
  abil_ride:          PropTypes.number.isRequired,
  abil_sail:          PropTypes.number.isRequired,
  abil_socialize:     PropTypes.number.isRequired,
  abil_stealth:       PropTypes.number.isRequired,
  abil_survival:      PropTypes.number.isRequired,
  abil_thrown:        PropTypes.number.isRequired,
  abil_war:           PropTypes.number.isRequired
}

export const withArmorStats = {
  armor_name: PropTypes.string,
  armor_is_artifact: PropTypes.bool,
  armor_tags: PropTypes.arrayOf(PropTypes.string)
}

export const specialty = {
  ability: PropTypes.string.isRequired,
  context: PropTypes.string.isRequired
}
export const withSpecialties = {
  specialties: PropTypes.arrayOf(PropTypes.shape( specialty ))
}

export const withBasicInfo = {
  id:                 PropTypes.number.isRequired,
  name:               PropTypes.string.isRequired,
  description:        PropTypes.string.isRequired,
  essence:            PropTypes.number.isRequired
}

export const withIntimacies = {
  principles: PropTypes.arrayOf(PropTypes.shape({

  })),
  ties: PropTypes.arrayOf(PropTypes.shape({

  }))
}

export const withCombatInfo = {
  initiative:         PropTypes.number.isRequired,
  onslaught:          PropTypes.number.isRequired
}

export const withMotePool = {
  motes_personal_total: PropTypes.number.isRequired,
  motes_personal_current: PropTypes.number.isRequired,
  motes_peripheral_total: PropTypes.number.isRequired,
  motes_peripheral_current: PropTypes.number.isRequired
}

export const qcAttack = {
  name: PropTypes.string.isRequired,
  pool: PropTypes.number.isRequired
}
export const qcMerit = {
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
}

export const fullQc = {
  ...withWillpower,
  ...withHealthLevels,
  ...withBasicInfo,
  ...withCombatInfo,
  ...withMotePool,
  ...withIntimacies,
  join_battle: PropTypes.number.isRequired,
  movement: PropTypes.number.isRequired,
  soak: PropTypes.number.isRequired,
  hardness: PropTypes.number.isRequired,
  appearance: PropTypes.number.isRequired,
  resolve: PropTypes.number.isRequired,
  guile: PropTypes.number.isRequired,
  evasion: PropTypes.number.isRequired,
  parry: PropTypes.number.isRequired,
  armor_name: PropTypes.string.isRequired,
  ref: PropTypes.string,
}

export const fullChar = {
  ...withWillpower,
  ...withHealthLevels,
  ...withBasicInfo,
  ...withCombatInfo,
  ...withArmorStats,
  ...withIntimacies
}

export const fullWeapon = {
  id: PropTypes.number.isRequired,
  character_id: PropTypes.number.isRequired,
  weight: PropTypes.string.isRequired,
  is_artifact: PropTypes.bool.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  ability: PropTypes.string
}

export const fullMerit = {
  id: PropTypes.number.isRequired,
  character_id: PropTypes.number.isRequired,
  name: PropTypes.string,
  merit_name: PropTypes.string,
  merit_cat: PropTypes.string,
  description: PropTypes.string,
  ref: PropTypes.string,
  supernatural: PropTypes.bool,
  prereqs: PropTypes.string
}

export const qcCharm = {
  id: PropTypes.number.isRequired,
  qc_id: PropTypes.number.isRequired,
  name: PropTypes.string,
  cost: PropTypes.string,
  timing: PropTypes.string,
  duration: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  min_essence: PropTypes.number,
  body: PropTypes.string,
  ref: PropTypes.string,
  category: PropTypes.string,
}
