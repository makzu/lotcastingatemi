import { Battlegroup as OldBattlegroup } from '@/types/battlegroup'
import { QcAttack } from '@/types/qc'

export interface Battlegroup extends Omit<OldBattlegroup, 'qc_attacks'> {
  qc_attacks: QcAttack[]
}
