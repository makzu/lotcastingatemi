import type { QcAttack } from '@/types'
import { bgAttackPool, bgDamage } from '@/utils/calculated'
import type { Battlegroup } from '../types'
import BattlegroupPoolDisplay from './BattlegroupPoolDisplay'
import BgBox from './BgBox'

const BattlegroupAttackDisplay = ({
  battlegroup,
  attack,
}: {
  battlegroup: Battlegroup
  attack: QcAttack
}) => {
  return (
    <div className="flexContainerWrap">
      <BgBox>
        <BattlegroupPoolDisplay label="Name" value={attack.name} />
      </BgBox>

      <BgBox>
        <BattlegroupPoolDisplay
          label="Attack"
          value={bgAttackPool(battlegroup, attack)}
        />
      </BgBox>

      <BgBox>
        <BattlegroupPoolDisplay
          label="Damage"
          value={bgDamage(battlegroup, attack)}
        />
      </BgBox>

      {attack.overwhelming > 0 && (
        <BgBox>
          <BattlegroupPoolDisplay label="Minimum" value={attack.overwhelming} />
        </BgBox>
      )}

      <BgBox>
        <BattlegroupPoolDisplay label="Range" value={attack.range} />
      </BgBox>

      <BgBox>
        <BattlegroupPoolDisplay
          label="Tags"
          value={attack.tags.join(', ') || 'None'}
        />
      </BgBox>
    </div>
  )
}

export default BattlegroupAttackDisplay
