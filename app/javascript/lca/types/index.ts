export * from './player'
export * from './character'
export * from './chronicle'
export * from './traits'
export * from './pool'

import type { Ability } from '@/utils/constants.new/abilities'
import type { Attribute } from '@/utils/constants.new/attributes'

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface PoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface StaticRating extends PoolBase {
  specialtyMatters: boolean
}

export type AttackRange = 'close' | 'short' | 'medium' | 'long' | 'extreme'
export type damageType = 'bashing' | 'lethal' | 'aggravated'
