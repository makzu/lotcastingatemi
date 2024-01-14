import HealthLevelBoxes from '@/components/generic/HealthLevelBoxes'

import BlockPaper from '@/components/shared/BlockPaper'
import type { withHealthLevels } from '@/utils/flow-types'

import { Typography } from '@mui/material'
interface Props {
  character: withHealthLevels
  penalties: Record<string, $TSFixMe>
}
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
