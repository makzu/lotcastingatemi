import {
  ARCHERY,
  AWARENESS,
  BRAWL,
  DODGE,
  MELEE,
  RESISTANCE,
  THROWN,
  WAR,
  ATHLETICS,
  INTEGRITY,
  LORE,
  PERFORMANCE,
  PRESENCE,
  SURVIVAL,
  BUREAUCRACY,
  CRAFT,
  INVESTIGATION,
  LINGUISTICS,
  MEDICINE,
  OCCULT,
  LARCENY,
  RIDE,
  SOCIALIZE,
  STEALTH,
} from './abilities'

export const DAWN = 'dawn'
export const ZENITH = 'zenith'
export const TWILIGHT = 'twilight'
export const NIGHT = 'night'
export const ECLIPSE = 'eclipse'

export const SOLAR_CASTES = [DAWN, ZENITH, TWILIGHT, NIGHT, ECLIPSE] as const

export const SOLAR_CASTE_ABILITIES = {
  DAWN: [ARCHERY, AWARENESS, BRAWL, DODGE, MELEE, RESISTANCE, THROWN, WAR],
  ZENITH: [
    ATHLETICS,
    INTEGRITY,
    LORE,
    PERFORMANCE,
    PRESENCE,
    RESISTANCE,
    SURVIVAL,
    WAR,
  ],
  TWILIGHT: [
    BUREAUCRACY,
    CRAFT,
    INTEGRITY,
    INVESTIGATION,
    LINGUISTICS,
    LORE,
    MEDICINE,
    OCCULT,
  ],
  NIGHT: [
    ATHLETICS,
    AWARENESS,
    DODGE,
    INVESTIGATION,
    LARCENY,
    RIDE,
    SOCIALIZE,
    STEALTH,
  ],
  ECLIPSE: [
    BUREAUCRACY,
    LINGUISTICS,
    LORE,
    OCCULT,
    PRESENCE,
    SOCIALIZE,
    STEALTH,
    WAR,
  ],
} as const
