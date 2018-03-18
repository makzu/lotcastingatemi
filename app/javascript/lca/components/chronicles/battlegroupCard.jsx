import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import { prettyDrillRating } from '../../utils/calculated'

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

    <Typography>
      Size { battlegroup.size },&nbsp;
      { prettyDrillRating(battlegroup) } Drill
      { battlegroup.might > 0 &&
        <span>, Might { battlegroup.might }</span>
      }
      { battlegroup.perfect_morale  &&
        <span>, Perfect Morale</span>
      }
    </Typography>

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
