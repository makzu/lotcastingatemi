import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'

import MarkdownDisplay from '@lca/components/generic/MarkdownDisplay.tsx'
import type { Spell } from '@lca/types'

type BlockProps = { spell: Spell; isOpen: boolean }
const SpellSummaryBlock = ({ spell, isOpen }: BlockProps) => {
  return (
    <>
      {spell.control && (
        <Typography variant="caption">Control Spell</Typography>
      )}
      <Collapse in={!isOpen}>
        <Typography variant="caption" className="capitalize">
          {spell.cost}, {spell.duration}
        </Typography>
        <MarkdownDisplay
          source={
            spell.body.substring(0, 200) +
            (spell.body.length > 200 ? '...' : '')
          }
          noBlocks
        />
      </Collapse>
    </>
  )
}

export default SpellSummaryBlock
