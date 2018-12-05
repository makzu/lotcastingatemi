// @flow
export * from './character'
export * from './qc'
export * from './shared.js'
export * from './pool.js'
import type { withBasicInfo, withCombatInfo, withWillpower } from './shared.js'
import type { withQcStats } from './qc'

export type Enhancer<P, EP> = (
  component: React.ComponentType<P>
) => React.ComponentType<EP>

export type Battlegroup = {
  id: number,
  name: string,
  description: string,
  magnitude: number,
  size: number,
  might: number,
  drill: number,
  soak: number,
  health_levels: number,
  perfect_morale: boolean,
  portrait_link: string,
  qc_attacks: Array<string>,
} & withBasicInfo &
  withQcStats &
  withWillpower &
  withCombatInfo

export type CombatActor = {}

export type Player = {
  id: number,
  display_name: string,
}

export type Chronicle = {
  st_id: number,
  name: string,
}

export type Ability =
  | 'archery'
  | 'athletics'
  | 'awareness'
  | 'brawl'
  | 'bureaucracy'
  | 'craft'
  | 'dodge'
  | 'integrity'
  | 'investigation'
  | 'larceny'
  | 'linguistics'
  | 'lore'
  | 'martial_arts'
  | 'medicine'
  | 'melee'
  | 'occult'
  | 'performance'
  | 'presence'
  | 'resistance'
  | 'ride'
  | 'sail'
  | 'socialize'
  | 'stealth'
  | 'survival'
  | 'thrown'
  | 'war'

export type Attribute =
  | 'strength'
  | 'dexterity'
  | 'stamina'
  | 'charisma'
  | 'manipulation'
  | 'appearance'
  | 'perception'
  | 'intelligence'
  | 'wits'
