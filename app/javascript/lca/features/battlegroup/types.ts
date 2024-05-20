import { type Battlegroup as OldBattlegroup } from '@/types/battlegroup'
import { type QcAttack } from '@/types/qc'

export interface Battlegroup extends Omit<OldBattlegroup, 'qc_attacks'> {
  portrait_link: string | undefined
  qc_attacks: QcAttack[]
}
