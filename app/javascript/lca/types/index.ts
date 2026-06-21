export * from './battlegroup.ts'
export * from './character.ts'
export * from './chronicle.ts'
export type { Player } from './player.ts'
export * from './qc.ts'
export * from './traits/index.ts'

import type { Ability, Attribute } from './character.ts'

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface PoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface StaticRating extends PoolBase {
  specialtyMatters: boolean
}
