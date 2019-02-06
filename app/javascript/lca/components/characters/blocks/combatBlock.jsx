// @flow
import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    maxWidth: '5.5rem',
    maxHeight: '5rem',
    textOverflow: 'ellipse',
  },
})

type Props = { pools: Object, classes: Object }
export function CombatBlock({ pools, classes }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Combat Pools</Typography>
      <div className={classes.container}>
        <PoolDisplay
          pool={pools.joinBattle}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.rush}
          label="Rush"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.disengage}
          label="Disengage"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.withdraw}
          label="Withdraw"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.riseFromProne}
          label="Rise from Prone"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.takeCover}
          label="Take Cover"
          classes={{ root: classes.poolBlock }}
        />
      </div>
    </BlockPaper>
  )
}

export default withStyles(styles)(CombatBlock)
