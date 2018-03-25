import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import PoolLine from '../characters/PoolLine.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import { prettyDrillRating, totalMagnitude } from '../../utils/calculated'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'inherit',
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
  statLabel: { ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
  },
  statValue: { ...theme.typography.body2,
    fontSize: '1.25rem',
    lineHeight: 'inherit',
  },
})

function BattlegroupCard({ battlegroup, classes }) {

  return <Paper className={ classes.root }>

    <Typography variant="title" className={ classes.battlegroupName }
      component={ Link } to={ `/battlegroups/${battlegroup.id}` }
    >
      { battlegroup.name }
      <Launch className={ classes.icon } />

      { battlegroup.hidden &&
        <div className={ classes.hiddenLabel }>
          <VisibilityOff className={ classes.icon } />
          Hidden
        </div>
      }
    </Typography>

    <PlayerNameSubtitle playerId={ battlegroup.player_id } />

    <div className={ classes.rowContainer }>
      <ResourceDisplay
        current={ battlegroup.magnitude }
        total={ totalMagnitude(battlegroup) }
        label="Magnitude"
        className={ classes.statWrap }
      />

      <PoolLine pool={{ total: battlegroup.size }}
        label="Size"
        classes={{ root: classes.statWrap }}
      />

      <div className={ classes.statWrap }>
        <div className={ classes.statLabel }>
          Drill:
        </div>
        <div className={ classes.statValue }>
          { prettyDrillRating(battlegroup) }
        </div>
      </div>

      { battlegroup.might > 0 &&
        <div className={ classes.statWrap }>
          <div className={ classes.statLabel }>
            Might:
          </div>
          <div className={ classes.statValue }>
            { battlegroup.might }
          </div>
        </div>
      }
      { battlegroup.perfect_morale  &&
        <div className={ classes.statWrap }>
          <div className={ classes.statLabel }>
            Morale:
          </div>
          <div className={ classes.statValue }>
            Perfect
          </div>
        </div>
      }
    </div>

    <Typography paragraph>
      <strong>Penalties:</strong>&nbsp;

      Onslaught -{ battlegroup.onslaught }
    </Typography>
  </Paper>
}
BattlegroupCard.propTypes = {
  battlegroup: PropTypes.object.isRequired,
  playerName: PropTypes.string,
  classes: PropTypes.object,
}

export default withStyles(styles)(BattlegroupCard)
