// @flow
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import PoolDisplay from 'components/generic/PoolDisplay.jsx'
import BlockPaper from 'components/generic/blockPaper.jsx'
import type { withArmorStats } from 'utils/flow-types'

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    width: '5rem',
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  name: {
    ...theme.typography.body2,
    minWidth: '8rem',
    margin: theme.spacing(),
    marginLeft: 0,
    maxHeight: '5rem',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  poolBlock: {
    margin: theme.spacing(),
    marginLeft: 0,
    width: '5.5rem',
    maxHeight: '5rem',
  },
  narrowPoolBlock: {
    margin: theme.spacing(),
    marginLeft: 0,
    width: '4.5rem',
  },
  tags: {
    ...theme.typography.body1,
    margin: theme.spacing(),
    marginLeft: 0,
    flex: 1,
    minWidth: '8rem',
    textTransform: 'capitalize',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
})

type Props = {
  character: withArmorStats,
  pools: Object,
  classes: Object,
}
function ArmorSummary({ character, pools, classes }: Props) {
  return (
    <BlockPaper>
      <Typography variant="h6">Armor &amp; Defense</Typography>

      <div className={classes.container}>
        <PoolDisplay
          staticRating
          pool={pools.evasion}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          pool={pools.bestParry}
          label="Best Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          pool={pools.soak}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {pools.hardness.total > 0 && (
          <PoolDisplay
            noSummary
            staticRating
            pool={pools.hardness}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}

        <div className={classes.name}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Armor Name</span>
          </div>
          {character.armor_name}
        </div>

        <div className={classes.tags}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Armor Tags</span>
          </div>
          {character.armor_tags.join(', ') || 'none'}
        </div>
      </div>
    </BlockPaper>
  )
}

export default withStyles(styles)(ArmorSummary)
