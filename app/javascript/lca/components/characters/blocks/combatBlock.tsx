import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'

import PoolDisplay from 'components/generic/PoolDisplay'
import BlockPaper from 'components/shared/BlockPaper'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poolBlock: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    maxWidth: '5.5rem',
    maxHeight: '5rem',
    textOverflow: 'ellipse',
  },
})

interface Props {
  pools: Record<string, $TSFixMe>
  classes: Record<string, $TSFixMe>
}
export function CombatBlock({ pools, classes }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Combat Pools</Typography>
      <div className={classes.container}>
        <PoolDisplay
          pool={pools.joinBattle}
          label="Join Battle"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          pool={pools.rush}
          label="Rush"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          pool={pools.disengage}
          label="Disengage"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          pool={pools.withdraw}
          label="Withdraw"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          pool={pools.riseFromProne}
          label="Rise from Prone"
          classes={{
            root: classes.poolBlock,
          }}
        />
        <PoolDisplay
          pool={pools.takeCover}
          label="Take Cover"
          classes={{
            root: classes.poolBlock,
          }}
        />
      </div>
    </BlockPaper>
  )
}
export default withStyles(styles)(CombatBlock)
