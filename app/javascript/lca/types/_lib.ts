import { ChSortable, Sortable } from 'utils'

export type Element = 'earth' | 'air' | 'fire' | 'water' | 'wood'

export interface WithId {
  id: number
}

export interface PlayerAsset extends WithId, ChSortable, Sortable {
  player_id: number
  chronicle_id: number
  pinned: boolean
  hidden: boolean
}
