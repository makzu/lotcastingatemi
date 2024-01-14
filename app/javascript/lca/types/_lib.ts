import type { ChSortable, Sortable } from '@/utils'

export type Element = 'earth' | 'air' | 'fire' | 'water' | 'wood'

export type Weight = 'light' | 'medium' | 'heavy'

export type Timing =
  | 'simple'
  | 'supplemental'
  | 'reflexive'
  | 'permanent'
  | 'supplemental/reflexive'

export interface WithId {
  id: number
  created_at: Date
  updated_at: Date
}

export interface PlayerAsset extends WithId, ChSortable, Sortable {
  player_id: number
  chronicle_id: number
  public: boolean
  pinned: boolean
  hidden: boolean
}

export interface CharacterTrait extends WithId, Sortable {
  character_id: number
}
