export * from './character'
export * from './qc'
export * from './battlegroup'
export * from './chronicle'

import { Sortable } from 'utils'
import { WithId } from './_lib'
import { Ability, Attribute } from './character'

interface CharacterTrait extends WithId, Sortable {
  character_id: number
}

export interface IMerit extends CharacterTrait {
  merit: string
  label: string
  merit_name: string
  supernatural: boolean
  merit_cat: 'story' | 'innate' | 'purchased' | 'flaw'
  description: string
  ref: string
  rating: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface ICharm extends CharacterTrait {
  ability: Ability | Attribute
}

export interface IPoison extends WithId, Sortable {
  poisonable_id: number
  poisonable_type: 'character' | 'qc' | 'battlegroup'
}

export interface IPoolBase {
  name: string
  ability: Ability
  attribute: Attribute
}

export interface IStaticRating extends IPoolBase {
  specialtyMatters: boolean
}
