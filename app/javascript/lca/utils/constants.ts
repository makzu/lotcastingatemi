/* Constants: exactly what it says on the tin */

export const ATTRIBUTES = [
  { attr: 'attr_strength', pretty: 'Strength' },
  { attr: 'attr_dexterity', pretty: 'Dexterity' },
  { attr: 'attr_stamina', pretty: 'Stamina' },
  { attr: 'attr_charisma', pretty: 'Charisma' },
  { attr: 'attr_manipulation', pretty: 'Manipulation' },
  { attr: 'attr_appearance', pretty: 'Appearance' },
  { attr: 'attr_perception', pretty: 'Perception' },
  { attr: 'attr_intelligence', pretty: 'Intelligence' },
  { attr: 'attr_wits', pretty: 'Wits' },
]

// Does not include Craft or Martial Arts, which get their own handling
export const ABILITIES = [
  { abil: 'abil_archery', pretty: 'Archery' },
  { abil: 'abil_athletics', pretty: 'Athletics' },
  { abil: 'abil_awareness', pretty: 'Awareness' },
  { abil: 'abil_brawl', pretty: 'Brawl' },
  { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
  { abil: 'abil_dodge', pretty: 'Dodge' },
  { abil: 'abil_integrity', pretty: 'Integrity' },
  { abil: 'abil_investigation', pretty: 'Investigation' },
  { abil: 'abil_larceny', pretty: 'Larceny' },
  { abil: 'abil_linguistics', pretty: 'Linguistics' },
  { abil: 'abil_lore', pretty: 'Lore' },
  { abil: 'abil_medicine', pretty: 'Medicine' },
  { abil: 'abil_melee', pretty: 'Melee' },
  { abil: 'abil_occult', pretty: 'Occult' },
  { abil: 'abil_performance', pretty: 'Performance' },
  { abil: 'abil_presence', pretty: 'Presence' },
  { abil: 'abil_resistance', pretty: 'Resistance' },
  { abil: 'abil_ride', pretty: 'Ride' },
  { abil: 'abil_sail', pretty: 'Sail' },
  { abil: 'abil_socialize', pretty: 'Socialize' },
  { abil: 'abil_stealth', pretty: 'Stealth' },
  { abil: 'abil_survival', pretty: 'Survival' },
  { abil: 'abil_thrown', pretty: 'Thrown' },
  { abil: 'abil_war', pretty: 'War' },
]

export const ABILITIES_ALL = [
  { abil: 'abil_archery', pretty: 'Archery' },
  { abil: 'abil_athletics', pretty: 'Athletics' },
  { abil: 'abil_awareness', pretty: 'Awareness' },
  { abil: 'abil_brawl', pretty: 'Brawl' },
  { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
  { abil: 'abil_craft', pretty: 'Craft' },
  { abil: 'abil_dodge', pretty: 'Dodge' },
  { abil: 'abil_integrity', pretty: 'Integrity' },
  { abil: 'abil_investigation', pretty: 'Investigation' },
  { abil: 'abil_larceny', pretty: 'Larceny' },
  { abil: 'abil_linguistics', pretty: 'Linguistics' },
  { abil: 'abil_lore', pretty: 'Lore' },
  { abil: 'abil_martial_arts', pretty: 'Martial Arts' },
  { abil: 'abil_medicine', pretty: 'Medicine' },
  { abil: 'abil_melee', pretty: 'Melee' },
  { abil: 'abil_occult', pretty: 'Occult' },
  { abil: 'abil_performance', pretty: 'Performance' },
  { abil: 'abil_presence', pretty: 'Presence' },
  { abil: 'abil_resistance', pretty: 'Resistance' },
  { abil: 'abil_ride', pretty: 'Ride' },
  { abil: 'abil_sail', pretty: 'Sail' },
  { abil: 'abil_socialize', pretty: 'Socialize' },
  { abil: 'abil_stealth', pretty: 'Stealth' },
  { abil: 'abil_survival', pretty: 'Survival' },
  { abil: 'abil_thrown', pretty: 'Thrown' },
  { abil: 'abil_war', pretty: 'War' },
]

export const ABILITIES_ALL_NO_MA = [
  { abil: 'abil_archery', pretty: 'Archery' },
  { abil: 'abil_athletics', pretty: 'Athletics' },
  { abil: 'abil_awareness', pretty: 'Awareness' },
  { abil: 'abil_brawl', pretty: 'Brawl' },
  { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
  { abil: 'abil_craft', pretty: 'Craft' },
  { abil: 'abil_dodge', pretty: 'Dodge' },
  { abil: 'abil_integrity', pretty: 'Integrity' },
  { abil: 'abil_investigation', pretty: 'Investigation' },
  { abil: 'abil_larceny', pretty: 'Larceny' },
  { abil: 'abil_linguistics', pretty: 'Linguistics' },
  { abil: 'abil_lore', pretty: 'Lore' },
  { abil: 'abil_medicine', pretty: 'Medicine' },
  { abil: 'abil_melee', pretty: 'Melee' },
  { abil: 'abil_occult', pretty: 'Occult' },
  { abil: 'abil_performance', pretty: 'Performance' },
  { abil: 'abil_presence', pretty: 'Presence' },
  { abil: 'abil_resistance', pretty: 'Resistance' },
  { abil: 'abil_ride', pretty: 'Ride' },
  { abil: 'abil_sail', pretty: 'Sail' },
  { abil: 'abil_socialize', pretty: 'Socialize' },
  { abil: 'abil_stealth', pretty: 'Stealth' },
  { abil: 'abil_survival', pretty: 'Survival' },
  { abil: 'abil_thrown', pretty: 'Thrown' },
  { abil: 'abil_war', pretty: 'War' },
]

// Does not include Martial Arts, which gets its own handling
export const ATTACK_ABILITIES = [
  'abil_archery',
  'abil_brawl',
  'abil_melee',
  'abil_thrown',
]

export const NON_ATTACK_ABILITIES = [
  'abil_athletics',
  'abil_awareness',
  'abil_bureaucracy',
  'abil_dodge',
  'abil_integrity',
  'abil_investigation',
  'abil_larceny',
  'abil_linguistics',
  'abil_lore',
  'abil_medicine',
  'abil_occult',
  'abil_performance',
  'abil_presence',
  'abil_resistance',
  'abil_ride',
  'abil_sail',
  'abil_socialize',
  'abil_stealth',
  'abil_survival',
  'abil_war',
]

export const SOLAR_CASTE_ABILITIES = {
  dawn: [
    { abil: 'abil_archery', pretty: 'Archery' },
    { abil: 'abil_awareness', pretty: 'Awareness' },
    { abil: 'abil_brawl', pretty: 'Brawl' },
    { abil: 'abil_dodge', pretty: 'Dodge' },
    { abil: 'abil_melee', pretty: 'Melee' },
    { abil: 'abil_resistance', pretty: 'Resistance' },
    { abil: 'abil_thrown', pretty: 'Thrown' },
    { abil: 'abil_war', pretty: 'War' },
  ],
  zenith: [
    { abil: 'abil_athletics', pretty: 'Athletics' },
    { abil: 'abil_integrity', pretty: 'Integrity' },
    { abil: 'abil_lore', pretty: 'Lore' },
    { abil: 'abil_performance', pretty: 'Performance' },
    { abil: 'abil_presence', pretty: 'Presence' },
    { abil: 'abil_resistance', pretty: 'Resistance' },
    { abil: 'abil_survival', pretty: 'Survival' },
    { abil: 'abil_war', pretty: 'War' },
  ],
  twilight: [
    { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
    { abil: 'abil_craft', pretty: 'Craft' },
    { abil: 'abil_integrity', pretty: 'Integrity' },
    { abil: 'abil_investigation', pretty: 'Investigation' },
    { abil: 'abil_linguistics', pretty: 'Linguistics' },
    { abil: 'abil_lore', pretty: 'Lore' },
    { abil: 'abil_medicine', pretty: 'Medicine' },
    { abil: 'abil_occult', pretty: 'Occult' },
  ],
  night: [
    { abil: 'abil_athletics', pretty: 'Athletics' },
    { abil: 'abil_awareness', pretty: 'Awareness' },
    { abil: 'abil_dodge', pretty: 'Dodge' },
    { abil: 'abil_investigation', pretty: 'Investigation' },
    { abil: 'abil_larceny', pretty: 'Larceny' },
    { abil: 'abil_ride', pretty: 'Ride' },
    { abil: 'abil_socialize', pretty: 'Socialize' },
    { abil: 'abil_stealth', pretty: 'Stealth' },
  ],
  eclipse: [
    { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
    { abil: 'abil_larceny', pretty: 'Larceny' },
    { abil: 'abil_linguistics', pretty: 'Linguistics' },
    { abil: 'abil_occult', pretty: 'Occult' },
    { abil: 'abil_presence', pretty: 'Presence' },
    { abil: 'abil_ride', pretty: 'Ride' },
    { abil: 'abil_sail', pretty: 'Sail' },
    { abil: 'abil_socialize', pretty: 'Socialize' },
  ],
}

export const ABYSSAL_CASTE_ABILITIES = {
  dusk: [
    { abil: 'abil_archery', pretty: 'Archery' },
    { abil: 'abil_athletics', pretty: 'Athletics' },
    { abil: 'abil_brawl', pretty: 'Brawl' },
    { abil: 'abil_melee', pretty: 'Melee' },
    { abil: 'abil_resistance', pretty: 'Resistance' },
    { abil: 'abil_ride', pretty: 'Ride' },
    { abil: 'abil_thrown', pretty: 'Thrown' },
    { abil: 'abil_war', pretty: 'War' },
  ],
  midnight: [
    { abil: 'abil_integrity', pretty: 'Integrity' },
    { abil: 'abil_larceny', pretty: 'Larceny' },
    { abil: 'abil_linguistics', pretty: 'Linguistics' },
    { abil: 'abil_lore', pretty: 'Lore' },
    { abil: 'abil_performance', pretty: 'Performance' },
    { abil: 'abil_presence', pretty: 'Presence' },
    { abil: 'abil_resistance', pretty: 'Resistance' },
    { abil: 'abil_survival', pretty: 'Survival' },
  ],
  daybreak: [
    { abil: 'abil_awareness', pretty: 'Awareness' },
    { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
    { abil: 'abil_craft', pretty: 'Craft' },
    { abil: 'abil_investigation', pretty: 'Investigation' },
    { abil: 'abil_lore', pretty: 'Lore' },
    { abil: 'abil_medicine', pretty: 'Medicine' },
    { abil: 'abil_occult', pretty: 'Occult' },
    { abil: 'abil_sail', pretty: 'Sail' },
  ],
  day: [
    { abil: 'abil_athletics', pretty: 'Athletics' },
    { abil: 'abil_awareness', pretty: 'Awareness' },
    { abil: 'abil_investigation', pretty: 'Investigation' },
    { abil: 'abil_dodge', pretty: 'Dodge' },
    { abil: 'abil_larceny', pretty: 'Larceny' },
    { abil: 'abil_socialize', pretty: 'Socialize' },
    { abil: 'abil_stealth', pretty: 'Stealth' },
    { abil: 'abil_survival', pretty: 'Survival' },
  ],
  moonshadow: [
    { abil: 'abil_bureaucracy', pretty: 'Bureaucracy' },
    { abil: 'abil_integrity', pretty: 'Integrity' },
    { abil: 'abil_linguistics', pretty: 'Linguistics' },
    { abil: 'abil_occult', pretty: 'Occult' },
    { abil: 'abil_presence', pretty: 'Presence' },
    { abil: 'abil_ride', pretty: 'Ride' },
    { abil: 'abil_sail', pretty: 'Sail' },
    { abil: 'abil_socialize', pretty: 'Socialize' },
  ],
}

export const LUNAR_CASTE_ATTRIBUTES = {
  'full moon': [
    { attr: 'attr_strength', pretty: 'Strength' },
    { attr: 'attr_dexterity', pretty: 'Dexterity' },
    { attr: 'attr_stamina', pretty: 'Stamina' },
  ],
  'changing moon': [
    { attr: 'attr_charisma', pretty: 'Charisma' },
    { attr: 'attr_manipulation', pretty: 'Manipulation' },
    { attr: 'attr_appearance', pretty: 'Appearance' },
  ],
  'no moon': [
    { attr: 'attr_perception', pretty: 'Perception' },
    { attr: 'attr_intelligence', pretty: 'Intelligence' },
    { attr: 'attr_wits', pretty: 'Wits' },
  ],
  casteless: [],
}

export const ABILITY_NAMES = [
  'archery',
  'athletics',
  'awareness',
  'brawl',
  'bureaucracy',
  'craft',
  'dodge',
  'integrity',
  'investigation',
  'larceny',
  'linguistics',
  'lore',
  'martial_arts',
  'medicine',
  'melee',
  'occult',
  'performance',
  'presence',
  'resistance',
  'ride',
  'sail',
  'socialize',
  'stealth',
  'survival',
  'thrown',
  'war',
]

export const ATTRIBUTE_NAMES = [
  'strength',
  'dexterity',
  'stamina',
  'charisma',
  'manipulation',
  'appearance',
  'perception',
  'intelligence',
  'wits',
]

/* Minimum and maximum */
export const ESSENCE_MAX = 10
export const ESSENCE_MIN = 1
export const ATTRIBUTE_MAX = 10
export const ATTRIBUTE_MIN = 1
export const ABILITY_MAX = 5
export const ABILITY_MIN = 0
export const WILLPOWER_MAX = 10
export const WILLPOWER_MIN = 0

export const INTIMACY_RATING_MAX = 3
export const INTIMACY_RATING_MIN = 1

export const MERIT_RATING_MAX = 6 // 6 means N/A
export const MERIT_RATING_MIN = 0

export const LIMIT_MAX = 10

// 7 health levels + 5 Stamina 5 Ox-Bodies, +15 for good measure:
export const HEALTH_LEVEL_MAX = 37
