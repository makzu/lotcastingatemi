import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import { prettyDrillRating } from '../../utils/calculated'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  hiddenLabel: {
    ...theme.typography.caption,
    display: 'inline-block',
    marginLeft: theme.spacing.unit
  },
})

function BattlegroupCard(props) {
  const { battlegroup, player, classes } = props

  return <div>
    <Paper className={ classes.root }>

      <Typography variant="title">
        { battlegroup.name }
        { battlegroup.hidden &&
          <div className={ classes.hiddenLabel }>
            <VisibilityOff />
            Hidden
          </div>
        }

        <Button component={ Link } to={ `/battlegroups/${battlegroup.id}` } style={{ float: 'right', }}>
          Full Sheet
        </Button>
      </Typography>

      <Typography variant="subheading">
        Player: { player.display_name }
      </Typography>

      <Typography>
        Size { battlegroup.size },&nbsp;
        { prettyDrillRating(battlegroup) } Drill
        { battlegroup.might > 0 &&
          <span>, Might { battlegroup.might }</span>
        }
      </Typography>

      <Typography paragraph>
        <strong>Penalties:</strong>&nbsp;

        Onslaught -{ battlegroup.onslaught }
      </Typography>
    </Paper>
  </div>
}
BattlegroupCard.propTypes = {
  battlegroupId: PropTypes.number.isRequired,
  battlegroup: PropTypes.object.isRequired,
  player: PropTypes.object,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const battlegroup = state.entities.battlegroups[ownProps.battlegroupId]
  const player = state.entities.players[battlegroup.player_id]

  return {
    battlegroup,
    player
  }
}

export default connect(mapStateToProps)(
  withStyles(styles)(BattlegroupCard)
)
