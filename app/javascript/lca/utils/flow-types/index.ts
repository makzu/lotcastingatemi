import type { Battlegroup as TSBattlegroup } from '@/types/battlegroup'
export * from './character'
export * from './pool'
export * from './qc'
export * from './shared'

/** @deprecated should not be necessary with typescript */
export type Enhancer<P, EP> = (
  component: React.ComponentType<P>,
) => React.ComponentType<EP>

/** @deprecated use Battlegroup from '@/types' instead */
export type Battlegroup = TSBattlegroup

/** @deprecated use '@/types' instead */
export type CombatActor = unknown

/** @deprecated use '@/types' instead */
export interface Player {
  id: number
  display_name: string
  characters: number[]
  qcs: number[]
  battlegroups: number[]
  chronicles: number[]
  own_chronicles: number[]
}

/** @deprecated use '@/types' instead */
export interface Chronicle {
  id: number
  st_id: number
  name: string
  players: number[]
}

/** @deprecated */
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

/** @deprecated */
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