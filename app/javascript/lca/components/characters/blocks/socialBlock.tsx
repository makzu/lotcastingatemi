import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PoolDisplay from 'components/generic/PoolDisplay'
import BlockPaper from 'components/generic/blockPaper'

const styles = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  poolBlock: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    width: '5.5rem',
    maxHeight: '5rem',
    textOverflow: 'ellipse',
  },
})

interface Props {
  pools: Record<string, $TSFixMe>
  classes: Record<string, $TSFixMe>
}

const SocialBlock = ({ pools, classes }: Props) => (
  <BlockPaper>
    <Typography variant="h6">Social Pools</Typography>

    <div className={classes.container}>
      <PoolDisplay
        staticRating
        pool={pools.resolve}
        label="Resolve"
        classes={{
          root: classes.poolBlock,
        }}
      />
      <PoolDisplay
        staticRating
        pool={pools.guile}
        label="Guile"
        classes={{
          root: classes.poolBlock,
        }}
      />
      <PoolDisplay
        staticRating
        pool={pools.appearance}
        label="Appearance"
        classes={{
          root: classes.poolBlock,
        }}
      />
      <PoolDisplay
        pool={pools.readIntentions}
        label="Read Intentions"
        classes={{
          root: classes.poolBlock,
        }}
      />
    </div>
  </BlockPaper>
)

export default withStyles(styles)(SocialBlock)
