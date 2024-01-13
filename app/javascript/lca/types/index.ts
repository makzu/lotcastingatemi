export * from './player'
export * from './character'
export * from './qc'
export * from './battlegroup'
export * from './chronicle'
export * from './traits'
export * from './pool'

import { Ability } from '@/utils/constants.new/abilities'
import { Attribute } from '@/utils/constants.new/attributes'

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface PoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface StaticRating extends PoolBase {
  specialtyMatters: boolean
}

export type damageType = 'bashing' | 'lethal' | 'aggravated'
