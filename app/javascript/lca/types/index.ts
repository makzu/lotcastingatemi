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
}

export interface ICharm extends ICharacterTrait {
  ability: Ability | Attribute
}

export interface IPoison extends WithId, ISortable {
  id: number
  poisonable_id: number
  poisonable_type: 'character' | 'qc' | 'battlegroup'
}
