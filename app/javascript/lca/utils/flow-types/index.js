// @flow
export * from './character'
export * from './qc'
export * from './shared.js'
export * from './pool.js'
import type { withBasicInfo, withCombatInfo, withWillpower } from './shared.js'
import type { withQcStats } from './qc'

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
