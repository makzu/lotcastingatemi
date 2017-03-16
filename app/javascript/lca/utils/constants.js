export const REQUEST_CHAR = 'REQUEST_CHAR'
export const RECEIVE_CHAR = 'RECEIVE_CHAR'
export const TOGGLE_EDITOR = 'TOGGLE_EDITOR'
export const UPDATE_CHAR = 'UPDATE_CHAR'
export const UPDATE_CHAR_COMPLETE = 'UPDATE_CHAR_COMPLETE'
export const UPDATE_WEAP = 'UPDATE_WEAP'
export const UPDATE_WEAP_COMPLETE = 'UPDATE_WEAP_COMPLETE'

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
