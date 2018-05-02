// @flow

import type {
  withBasicInfo,
  withCombatInfo,
  withHealthLevels,
  withIntimacies,
  withMotePool,
  withWillpower,
} from '../shared.js'

export type withQcStats = {
  join_battle: number,
  movement: number,
  soak: number,
  hardness: number,
  appearance: number,
  resolve: number,
  guile: number,
  evasion: number,
  parry: number,
  senses: number,
  armor_name: string,
}

export type fullQc = {
  excellency: string,
  grapple: number,
  grapple_control: number,
  actions: Array<{ action: string, pool: number }>,
  ref: string,
  qc_attacks: Array<string>,
  qc_charms: Array<string>,
  qc_merits: Array<string>,
} & withQcStats &
  withWillpower &
  withHealthLevels &
  withBasicInfo &
  withCombatInfo &
  withMotePool &
  withIntimacies

export type QcAttack = {
  id: number,
  name: string,
  pool: number,
  damage: number,
  overwhelming: number,
  range: string,
  tags: Array<string>,
  qc_attackable_type: 'Qc' | 'Battlegroup',
}

export type QcMerit = {
  id: number,
  name: string,
  body: string,
  latent: boolean,
  magical: boolean,
  ref: string,
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
