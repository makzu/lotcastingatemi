import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
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
    verticalAlign: 'middle',
    lineHeight: 'inherit',
  },
  qcName: {
    textDecoration: 'none',
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing.unit,
  },
})

function QcCard({ qc, classes }) {
  return <Paper className={ classes.root }>

    <Typography variant="title" className={ classes.qcName }
      component={ Link } to={ `/qcs/${qc.id}` }
    >
      { qc.name }

      <Launch className={ classes.icon } />
      { qc.hidden &&
        <div className={ classes.hiddenLabel }>
          <VisibilityOff className={ classes.icon } />
          Hidden
        </div>
      }
    </Typography>

    <PlayerNameSubtitle playerId={ qc.player_id } />

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
}
QcCard.propTypes = {
  qc: PropTypes.shape(fullQc).isRequired,
  player: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(QcCard)
