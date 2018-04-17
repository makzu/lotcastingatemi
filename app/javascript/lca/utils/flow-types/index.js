// @flow
export * from './character'
export * from './qc'
export * from './shared.js'

export type Charm = {
  id: number,
  name: string,
  charm_type: string,
  style?: string,
  artifact_name?: string,
  ability?: string,
  cost: string,
  timing: string,
  duration: string,
  keywords: Array<string>,
  min_essence: number,
  body: string,
  ref: string,
  categories: Array<string>,
}

export type fullWeapon = {
  id: number,
  character_id: number,
  weight: 'light' | 'medium' | 'heavy',
  is_artifact: boolean,
  tags: Array<string>,
  ability: string,
}

export type fullMerit = {
  id: number,
  character_id: number,
  name: string,
  merit_name: string,
  merit_cat: string,
  description: string,
  ref: string,
  supernatural: boolean,
  prereqs: string,
}

export type Battlegroup = {
  id: number,
  size: number,
  might: number,
  drill: number,
  soak: number,
  health_levels: number,
  perfect_morale: boolean,
}

export type CombatActor = {}
