import { WithId } from './_lib'

export interface Spell extends WithId {
  name: string
  sorcerer_id: number
  sorcerer_type: 'character' | 'qc'
  cost: string
  circle: string
  control: boolean
  timing: string
  duration: string
  keywords: string[]
  body: string
  ref: string
  categories: string[]
}
