import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import PoolLine from '../PoolLine.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import { withArmorStats } from '../../../utils/propTypes'

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

function ArmorSummary({ character, pools, classes }) {
  return <BlockPaper>
    <Typography variant="title">
      Armor &amp; Defense
    </Typography>

    <div className={ classes.container }>
      <PoolLine pool={ pools.evasion } label="Evasion" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.soak } label="Soak" classes={{ root: classes.poolBlock }} />
      { pools.hardness.total > 0 &&
        <PoolLine pool={ pools.hardness } label="Hardness" classes={{ root: classes.poolBlock }} />
      }
      <PoolLine pool={{ total: character.armor_name }} label="Armor Name" classes={{ root: classes.poolBlock }} />
    </div>

  </BlockPaper>
}
ArmorSummary.propTypes = {
  character: PropTypes.shape(withArmorStats),
  pools: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(ArmorSummary)
