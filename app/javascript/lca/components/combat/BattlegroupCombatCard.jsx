// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Launch from '@material-ui/icons/Launch'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import BattlegroupHealthDisplay from '../battlegroups/BattlegroupHealthDisplay.jsx'
import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CombatControls from './CombatControls.jsx'
import sharedStyles from 'styles/'
import { prettyDrillRating } from 'utils/calculated'

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
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  nameWrap: {
    flex: 1,
  },
  battlegroupName: {
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
  statWrap: {
    marginRight: theme.spacing.unit,
  },
  statLabel: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  statValue: {
    ...theme.typography.body2,
    fontSize: '1.25rem',
    lineHeight: 'inherit',
  },
})

type Props = {
  battlegroup: Object,
  classes: Object,
}

function BattlegroupCard(props: Props) {
  const { battlegroup, classes } = props

  return (
    <Paper className={classes.root}>
      <div className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={classes.battlegroupName}
            component={Link}
            to={`/battlegroups/${battlegroup.id}`}
          >
            {battlegroup.name}
            <Launch className={classes.icon} />

            {battlegroup.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={battlegroup.player_id} />
        </div>
      </div>

      <CombatControls character={battlegroup} characterType="battlegroup" />

      <div className={classes.flexContainerWrap}>
        <BattlegroupHealthDisplay
          battlegroup={battlegroup}
          className={classes.statWrap}
        />

        <div className={classes.statWrap}>
          <div className={classes.statLabel}>Drill</div>
          <div className={classes.statValue}>
            {prettyDrillRating(battlegroup)}
          </div>
        </div>

        {battlegroup.might > 0 && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Might</div>
            <div className={classes.statValue}>{battlegroup.might}</div>
          </div>
        )}
        {battlegroup.perfect_morale && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Morale</div>
            <div className={classes.statValue}>Perfect</div>
          </div>
        )}
      </div>
      {battlegroup.onslaught > 0 && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>&nbsp; Onslaught -{battlegroup.onslaught}
        </Typography>
      )}

    </Paper>
  )
}

export default withStyles(styles)(BattlegroupCard)
