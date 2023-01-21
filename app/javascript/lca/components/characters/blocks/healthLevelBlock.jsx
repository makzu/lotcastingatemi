// @flow
import Typography from '@mui/material/Typography'

import BlockPaper from 'components/generic/blockPaper.jsx'
import HealthLevelBoxes from 'components/generic/HealthLevelBoxes.jsx'

import type { withHealthLevels } from 'utils/flow-types'

type Props = { character: withHealthLevels, penalties: Object }
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
