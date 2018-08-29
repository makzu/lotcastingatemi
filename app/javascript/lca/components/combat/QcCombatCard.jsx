// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CombatControls from './CombatControls.jsx'
import RemoveFromCombatButton from './RemoveFromCombatButton.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import sharedStyles from 'styles/'
import { getPenaltiesForQc, getPoolsAndRatingsForQc } from 'selectors'
import type { fullQc } from 'utils/flow-types'

const styles = theme => ({
  ...sharedStyles(theme),
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
  },
  nameWrap: {
    flex: 1,
  },
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  qcName: {
    textDecoration: 'none',
  },
  hasActed: {
    textDecoration: 'none',
    opacity: 0.5,
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '4.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

type Props = {
  qc: fullQc,
  penalties: Object,
  pools: Object,
  player: Object,
  classes: Object,
}

function QcCard(props: Props) {
  const { qc, penalties, pools, classes } = props

  return (
    <Paper className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={qc.has_acted ? classes.hasActed : classes.qcName}
            component={Link}
            to={`/qcs/${qc.id}`}
          >
            {qc.name}

            {qc.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={qc.player_id} />
        </div>
      </div>

      <CombatControls character={qc} characterType="qc" />

      <SpendableBlock character={qc} qc />

      <div className={classes.flexContainerWrap}>
        <PoolDisplay
          pool={pools.evasion}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.parry}
          label="Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          noSummary
          pool={{ total: qc.soak }}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {qc.hardness > 0 && (
          <PoolDisplay
            noSummary
            pool={{ total: qc.hardness }}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
      </div>

      {(penalties.mobility > 0 ||
        penalties.onslaught > 0 ||
        penalties.wound > 0) && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp;
          {penalties.mobility > 0 && (
            <span>Mobility -{penalties.mobility} </span>
          )}
          {penalties.onslaught > 0 && (
            <span>Onslaught -{penalties.onslaught} </span>
          )}
          {penalties.wound > 0 && <span>Wound -{penalties.wound}</span>}
        </Typography>
      )}

      <RemoveFromCombatButton character={qc} characterType="qc" />
    </Paper>
  )
}
function mapStateToProps(state, props) {
  return {
    penalties: getPenaltiesForQc(state, props.qc.id),
    pools: getPoolsAndRatingsForQc(state, props.qc.id),
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(QcCard)
