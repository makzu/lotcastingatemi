/* Constants: exactly what it says on the tin */

export const ATTRIBUTES = [
  { attr: "attr_strength", pretty: "Strength" },
  { attr: "attr_dexterity", pretty: "Dexterity" },
  { attr: "attr_stamina", pretty: "Stamina" },

  { attr: "attr_charisma", pretty: "Charisma" },
  { attr: "attr_manipulation", pretty: "Manipulation" },
  { attr: "attr_appearance", pretty: "Appearance" },

  { attr: "attr_perception", pretty: "Perception" },
  { attr: "attr_intelligence", pretty: "Intelligence" },
  { attr: "attr_wits", pretty: "Wits" }
]

// Does not include Craft or Martial Arts, which get their own handling
export const ABILITIES = [
  { abil: "abil_archery", pretty: "Archery" },
  { abil: "abil_athletics", pretty: "Athletics" },
  { abil: "abil_awareness", pretty: "Awareness" },
  { abil: "abil_brawl", pretty: "Brawl" },
  { abil: "abil_bureaucracy", pretty: "Bureaucracy" },
  { abil: "abil_dodge", pretty: "Dodge" },
  { abil: "abil_integrity", pretty: "Integrity" },
  { abil: "abil_investigation", pretty: "Investigation" },
  { abil: "abil_larceny", pretty: "Larceny" },
  { abil: "abil_linguistics", pretty: "linguistics" },
  { abil: "abil_lore", pretty: "Lore" },
  { abil: "abil_medicine", pretty: "Medicine" },
  { abil: "abil_melee", pretty: "Melee" },
  { abil: "abil_occult", pretty: "Occult" },
  { abil: "abil_performance", pretty: "Performance" },
  { abil: "abil_presence", pretty: "Presence" },
  { abil: "abil_resistance", pretty: "Resistance" },
  { abil: "abil_ride", pretty: "Ride" },
  { abil: "abil_sail", pretty: "Sail" },
  { abil: "abil_socialize", pretty: "Socialize" },
  { abil: "abil_stealth", pretty: "Stealth" },
  { abil: "abil_survival", pretty: "Survival" },
  { abil: "abil_thrown", pretty: "Thrown" },
  { abil: "abil_war", pretty: "War" }
]

export const ABILITIES_ALL = [
  { abil: "abil_archery", pretty: "Archery" },
  { abil: "abil_athletics", pretty: "Athletics" },
  { abil: "abil_awareness", pretty: "Awareness" },
  { abil: "abil_brawl", pretty: "Brawl" },
  { abil: "abil_bureaucracy", pretty: "Bureaucracy" },
  { abil: "abil_craft", pretty: "Craft" },
  { abil: "abil_dodge", pretty: "Dodge" },
  { abil: "abil_integrity", pretty: "Integrity" },
  { abil: "abil_investigation", pretty: "Investigation" },
  { abil: "abil_larceny", pretty: "Larceny" },
  { abil: "abil_linguistics", pretty: "linguistics" },
  { abil: "abil_lore", pretty: "Lore" },
  { abil: "abil_martial_arts", pretty: "Martial Arts" },
  { abil: "abil_medicine", pretty: "Medicine" },
  { abil: "abil_melee", pretty: "Melee" },
  { abil: "abil_occult", pretty: "Occult" },
  { abil: "abil_performance", pretty: "Performance" },
  { abil: "abil_presence", pretty: "Presence" },
  { abil: "abil_resistance", pretty: "Resistance" },
  { abil: "abil_ride", pretty: "Ride" },
  { abil: "abil_sail", pretty: "Sail" },
  { abil: "abil_socialize", pretty: "Socialize" },
  { abil: "abil_stealth", pretty: "Stealth" },
  { abil: "abil_survival", pretty: "Survival" },
  { abil: "abil_thrown", pretty: "Thrown" },
  { abil: "abil_war", pretty: "War" }
]

export const ATTACK_ABILITIES = [
  "abil_archery",
  "abil_brawl",
  "abil_melee",
  "abil_thrown"
]

/* Minimum and maximum */
export const ESSENCE_MAX = 10
export const ESSENCE_MIN = 1
export const ATTRIBUTE_MAX = 5
export const ATTRIBUTE_MIN = 1
export const ABILITY_MAX = 5
export const ABILITY_MIN = 0
export const WILLPOWER_MAX = 10
export const WILLPOWER_MIN = 0

export const INTIMACY_RATING_MAX = 3
export const INTIMACY_RATING_MIN = 1

export const MERIT_RATING_MAX = 5
export const MERIT_RATING_MIN = 1

// Arbitrarily chosen number.  Hopefully it's not too much or too little.
export const HEALTH_LEVEL_MAX = 15
