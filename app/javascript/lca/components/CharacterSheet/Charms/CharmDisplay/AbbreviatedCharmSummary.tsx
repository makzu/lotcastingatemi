import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import type { Charm } from '@lca/types'
import { PrereqSummaryLine } from './PrereqSummaryLine'

type BlockProps = { charm: Charm; isOpen: boolean }
const CharmSummaryBlock = ({ charm, isOpen }: BlockProps) => {
  return (
    <Collapse in={!isOpen}>
      <PrereqSummaryLine charm={charm} />
      <Typography variant="caption" className="capitalize">
        {charm.cost}, {charm.timing}, {charm.duration}
      </Typography>
      <MarkdownDisplay
        source={
          charm.summary.length === 0
            ? charm.body.substring(0, 200) +
              (charm.body.length > 200 ? '...' : '')
            : charm.summary
        }
        noBlocks
      />
    </Collapse>
  )
}

export default CharmSummaryBlock
