import React from 'react'
import Typography from '@material-ui/core/Typography'
import BlockPaper from 'components/generic/blockPaper'
import HealthLevelBoxes from 'components/generic/HealthLevelBoxes'
import type { withHealthLevels } from 'utils/flow-types'
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
