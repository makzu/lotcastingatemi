import * as React from 'react'
export * from './character'
export * from './qc'
export * from './shared'
export * from './pool'
import type { withBasicInfo, withCombatInfo, withWillpower } from './shared'
import type { withQcStats } from './qc'
export type Enhancer<P, EP> = (
  component: React.ComponentType<P>,
) => React.ComponentType<EP>

export type Battlegroup = {
  name: string
  description: string
  magnitude: number
  size: number
  might: number
  drill: number
  soak: number
  health_levels: number
  perfect_morale: boolean
  portrait_link: string
} & withBasicInfo &
  withQcStats &
  withWillpower &
  withCombatInfo
export type CombatActor = unknown
export interface Player {
  id: number
  display_name: string
  characters: number[]
  qcs: number[]
  battlegroups: number[]
  chronicles: number[]
  own_chronicles: number[]
}
export interface Chronicle {
  id: number
  st_id: number
  name: string
  players: number[]
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
