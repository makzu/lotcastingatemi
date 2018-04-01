import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import PoolLine from '../PoolLine.jsx'
import BlockPaper from '../../generic/blockPaper.jsx'
import { withAttributes, withAbilities } from '../../../utils/propTypes'

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

export function CombatBlock({ pools, classes }) {
  return <BlockPaper>
    <Typography variant="title">
      Combat Pools
    </Typography>
    <div className={ classes.container }>
      <PoolLine pool={ pools.joinBattle } label="Join Battle" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.rush } label="Rush" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.disengage } label="Disengage" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.withdraw } label="Withdraw" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.riseFromProne } label="Rise from Prone" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.takeCover } label="Take Cover" classes={{ root: classes.poolBlock }} />
    </div>
  </BlockPaper>
}
CombatBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities }),
  pools: PropTypes.object,
  penalties: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(CombatBlock)
