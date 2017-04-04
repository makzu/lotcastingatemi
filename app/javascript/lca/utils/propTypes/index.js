import { PropTypes } from 'react'

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
