import { Sortable } from 'utils'
import { Timing, WithId } from '../_lib'

export interface Spell extends WithId, Sortable {
  name: string
  sorcerer_id: number
  sorcerer_type: 'character' | 'qc'
  cost: string
  circle: 'terrestrial' | 'celestial' | 'solar' | 'ivory' | 'shadow' | 'void'
  control: boolean
  timing: Timing
  duration: string
  keywords: string[]
  body: string
  ref: string
  categories: string[]
}
