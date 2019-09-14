export * from './character'
export * from './qc'
export * from './battlegroup'
export * from './chronicle'
export * from './traits'

import { Ability, Attribute } from './character'

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface PoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface StaticRating extends PoolBase {
  specialtyMatters: boolean
}
