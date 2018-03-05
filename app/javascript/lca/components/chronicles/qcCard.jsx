import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import { woundPenalty } from '../../utils/calculated'
import { fullQc } from '../../utils/propTypes'

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

function CharacterCard(props) {
  const { qc, player, classes } = props

  return <div>
    <Paper className={ classes.root }>

      <Typography variant="title">
        { qc.name }
        { qc.hidden &&
          <div className={ classes.hiddenLabel }>
            <VisibilityOff />
            Hidden
          </div>
        }

        <Button component={ Link } to={ `/qcs/${qc.id}` } style={{ float: 'right', }}>
          Full Sheet
        </Button>
      </Typography>

      <Typography variant="subheading">
        Player: { player.display_name }
      </Typography>

      <Typography>
        { qc.motes_personal_total > 0 &&
          <span>
            Motes: { qc.motes_personal_current }/{ qc.motes_personal_total } Personal,&nbsp;
          </span>
        }
        { qc.motes_peripheral_total > 0 &&
          <span>
            { qc.motes_peripheral_current }/{ qc.motes_peripheral_total } Peripheral,&nbsp;
          </span>
        }
        Willpower: { qc.willpower_temporary }/{ qc.willpower_permanent }
      </Typography>

      <Typography paragraph>
        <strong>Penalties:</strong>&nbsp;

        Onslaught -{ qc.onslaught },&nbsp;
        Wound -{ woundPenalty(qc) }
      </Typography>
    </Paper>
  </div>
}
CharacterCard.propTypes = {
  qcId: PropTypes.number.isRequired,
  qc: PropTypes.shape(fullQc).isRequired,
  player: PropTypes.object,
  classes: PropTypes.object,
}

function mapStateToProps(state, ownProps) {
  const qc = state.entities.qcs[ownProps.qcId]
  const player = state.entities.players[qc.player_id]

  return {
    qc,
    player
  }
}

export default connect(mapStateToProps)(
  withStyles(styles)(CharacterCard)
)
