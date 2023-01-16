// @flow
import Typography from '@mui/material/Typography'

import HealthLevelBoxes from 'components/generic/HealthLevelBoxes.jsx'
import BlockPaper from 'components/shared/BlockPaper'

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
