import type { QC } from '@/types'
import type { Timing } from '@/types/_lib'

/** @deprecated Use QC from '@/types' instead */
export type fullQc = QC

interface QcTrait {
  id: number
  sort_order: number
}
export type QcAttack = QcTrait & {
  name: string
  pool: number
  damage: number
  overwhelming: number
  range: string
  tags: string[]
  qc_attackable_type: 'Qc' | 'Battlegroup'
  qc_attackable_id: number
}
export type QcMerit = QcTrait & {
  name: string
  body: string
  latent: boolean
  magical: boolean
  ref: string
}
export type QcCharm = QcTrait & {
  qc_id: number
  name: string
  cost: string
  timing: Timing
  duration: string
  keywords: string[]
  min_essence: number
  body: string
  ref: string
  category: string
}
