import Typography from '@material-ui/core/Typography'

import BlockPaper from '@lca/components/generic/BlockPaper.tsx'
import HealthLevelBoxes from '@lca/components/generic/HealthLevelBoxes.tsx'
import type { WithSharedStats } from '@lca/types/shared.ts'

type Props = { character: WithSharedStats; penalties: Object }
export default function HealthLevelBlock({ character, penalties }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Health Levels</Typography>

      <HealthLevelBoxes character={character} />

      <br />
      <Typography>
        <strong>Wound Penalty:</strong> -{penalties.wound}
      </Typography>
    </BlockPaper>
  )
}
