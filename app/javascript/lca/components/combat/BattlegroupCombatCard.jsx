// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from '@material-ui/icons/Launch'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import InitiativeWidget from '../generic/InitiativeWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import { doIOwnBattlegroup } from 'selectors'
import { prettyDrillRating, totalMagnitude } from 'utils/calculated'

const styles = theme => ({
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
  nameRow: {
    display: 'flex',
  },
  nameWrap: {
    flex: 1,
  },
  battlegroupName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
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
  isOwner: boolean,
  classes: Object,
}

function BattlegroupCard(props: Props) {
  const { battlegroup, isOwner, classes } = props

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

        {isOwner && (
          <CharacterCardMenu characterType="battlegroup" id={battlegroup.id} />
        )}
      </div>

      <div className={classes.rowContainer}>
        <ResourceDisplay
          current={battlegroup.magnitude}
          total={totalMagnitude(battlegroup)}
          label="Magnitude"
          className={classes.statWrap}
        />

        <PoolDisplay
          battlegroup
          staticRating
          pool={{ total: battlegroup.size }}
          label="Size"
          classes={{ root: classes.statWrap }}
        />

        <div className={classes.statWrap}>
          <div className={classes.statLabel}>Drill:</div>
          <div className={classes.statValue}>
            {prettyDrillRating(battlegroup)}
          </div>
        </div>

        {battlegroup.might > 0 && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Might:</div>
            <div className={classes.statValue}>{battlegroup.might}</div>
          </div>
        )}
        {battlegroup.perfect_morale && (
          <div className={classes.statWrap}>
            <div className={classes.statLabel}>Morale:</div>
            <div className={classes.statValue}>Perfect</div>
          </div>
        )}
      </div>
      {battlegroup.onslaught > 0 && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>&nbsp; Onslaught -{battlegroup.onslaught}
        </Typography>
      )}

      <InitiativeWidget character={battlegroup} characterType="battlegroup" />
    </Paper>
  )
}
const mapStateToProps = (state, props) => ({
  isOwner: doIOwnBattlegroup(state, props.battlegroup.id),
})

export default withStyles(styles)(connect(mapStateToProps)(BattlegroupCard))
