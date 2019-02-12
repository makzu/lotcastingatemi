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
  qc_attacks: Array<number>,
}

export type fullQc = {
  excellency: string,
  grapple: number,
  grapple_control: number,
  actions: Array<{ action: string, pool: number }>,
  ref: string,
  qc_charms: Array<number>,
  qc_merits: Array<number>,
  portrait_link: string,
  type: 'qc',
} & withQcStats &
  withWillpower &
  withHealthLevels &
  withBasicInfo &
  withCombatInfo &
  withMotePool &
  withIntimacies

type QcTrait = {
  id: number,
  sort_order: number,
}
export type QcAttack = QcTrait & {
  name: string,
  pool: number,
  damage: number,
  overwhelming: number,
  range: string,
  tags: Array<string>,
  qc_attackable_type: 'Qc' | 'Battlegroup',
  qc_attackable_id: number,
}

export type QcMerit = QcTrait & {
  name: string,
  body: string,
  latent: boolean,
  magical: boolean,
  ref: string,
}

export type QcCharm = QcTrait & {
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
