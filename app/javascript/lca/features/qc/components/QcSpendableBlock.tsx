import ResourceDisplay from '@/components/displays/ResourceDisplay'
import PoolStack from '@/components/shared/PoolStack'
import type { QC } from '../types'

const QcSpendableBlock = ({ qc }: { qc: QC }) => {
  return (
    <PoolStack>
      {qc.motes_personal_total > 0 && (
        <ResourceDisplay
          label="Personal"
          current={qc.motes_personal_current}
          total={qc.motes_personal_total}
        />
      )}
      {qc.motes_peripheral_total > 0 && (
        <ResourceDisplay
          label="Peripheral"
          current={qc.motes_peripheral_current}
          total={qc.motes_peripheral_total}
        />
      )}
      {qc.is_sorcerer && (
        <ResourceDisplay label="Sorcerous" current={qc.sorcerous_motes} />
      )}
      {qc.is_necromancer && (
        <ResourceDisplay label="Necromantic" current={qc.necromantic_motes} />
      )}

      <ResourceDisplay
        label="Willpower"
        current={qc.willpower_temporary}
        total={qc.willpower_permanent}
      />
    </PoolStack>
  )
}

export default QcSpendableBlock
