export * from './battlegroup'
export * from './character'
export * from './chronicle'
export type { Player } from './player.ts'
export * from './qc'
export * from './traits'

import type { Ability, Attribute } from './character'

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface PoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface StaticRating extends PoolBase {
  specialtyMatters: boolean
}
