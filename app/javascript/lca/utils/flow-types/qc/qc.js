// @flow

import type {
  withBasicInfo,
  withCombatInfo,
  withHealthLevels,
  withIntimacies,
  withMotePool,
  withWillpower,
} from '../shared.js'

export type fullQc = {
  join_battle: number,
  movement: number,
  soak: number,
  hardness: number,
  appearance: number,
  resolve: number,
  guile: number,
  evasion: number,
  parry: number,
  armor_name: string,
  ref: string,
} & withWillpower &
  withHealthLevels &
  withBasicInfo &
  withCombatInfo &
  withMotePool &
  withIntimacies

export type QcAttack = {
  name: string,
  pool: number,
  damage: number,
}

export type QcMerit = {
  name: string,
  body: string,
}

export type QcCharm = {
  id: number,
  qc_id: number,
  name: string,
  cost: string,
  timing: string,
  duration: string,
  keywords: Array<string>,
  min_essence: number,
  body: string,
  ref: string,
  category: string,
}
