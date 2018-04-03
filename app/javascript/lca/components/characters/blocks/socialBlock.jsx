import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

import PoolDisplay from '../../generic/PoolDisplay.jsx'
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
    width: '5.5rem',
    maxHeight: '5rem',
    textOverflow: 'ellipse',
  },
})

const SocialBlock = ({ pools, classes }) =>
  <BlockPaper>
    <Typography variant="title">
      Social Pools
    </Typography>

    <div className={ classes.container }>
      <PoolDisplay staticRating pool={ pools.resolve } label="Resolve" classes={{ root: classes.poolBlock }} />
      <PoolDisplay staticRating pool={ pools.guile } label="Guile" classes={{ root: classes.poolBlock }} />
      <PoolDisplay staticRating pool={ pools.appearance } label="Appearance" classes={{ root: classes.poolBlock }} />
      <PoolDisplay pool={ pools.readIntentions } label="Read Intentions" classes={{ root: classes.poolBlock }} />
    </div>

  </BlockPaper>

SocialBlock.propTypes = {
  character: PropTypes.shape({ ...withAttributes, ...withAbilities }),
  pools: PropTypes.object,
  penalties: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(SocialBlock)
