// @flow
export * from './character'
export * from './qc'
export * from './shared.js'
export * from './pool.js'
import type { withBasicInfo, withCombatInfo, withWillpower } from './shared.js'
import type { withQcStats } from './qc'

type traitBasics = {
  id: number,
  character_id: number,
  name: string,
}

export type Charm = traitBasics & {
  charm_type: string,
  type: string,
  min_essence: number,
  style?: string,
  artifact_name?: string,
  ability: string,
  min_ability: string,
  cost: string,
  timing: string,
  duration: string,
  keywords: Array<string>,
  prereqs: string,
  body: string,
  ref: string,
  summary: string,
  categories: Array<string>,
}

export type Spell = traitBasics & {
  cost: string,
  circle: string,
  control: boolean,
  timing: string,
  duration: string,
  keywords: Array<string>,
  body: string,
  ref: string,
  categories: Array<string>,
}

export type fullWeapon = traitBasics & {
  weight: 'light' | 'medium' | 'heavy',
  is_artifact: boolean,
  tags: Array<string>,
  ability: string,
  attr: string,
  damage_attr: string,
}

export type fullMerit = {
  id: number,
  character_id: number,
  label: string,
  merit_name: string,
  merit_cat: string,
  rating: number,
  description: string,
  ref: string,
  supernatural: boolean,
  prereqs: string,
}

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
