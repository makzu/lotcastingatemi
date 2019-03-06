export * from './character'

import { Ability, Attribute } from './character'

interface WithId {
  id: number
}
interface ISortable {
  sort_order: number
}

interface ICharacterTrait extends WithId, ISortable {
  character_id: number
}

export interface IMerit extends ICharacterTrait {
  merit: string
  label: string
  merit_name: string
  supernatural: boolean
  merit_cat: 'story' | 'innate' | 'purchased' | 'flaw'
  description: string
  ref: string
  rating: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface ICharm extends ICharacterTrait {
  ability: Ability | Attribute
}

export interface IPoison extends WithId, ISortable {
  id: number
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
