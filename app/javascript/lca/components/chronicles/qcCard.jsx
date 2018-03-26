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
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
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
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  moteWrap: {
    marginRight: theme.spacing.unit,
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

    <div className={ classes.rowContainer }>
      { qc.motes_personal_total > 0 &&
        <MoteSpendWidget qc character={ qc }>
          <ResourceDisplay className={ classes.moteWrap }
            current={ qc.motes_personal_current }
            total={ qc.motes_personal_total }
            label="Personal:"
          />
        </MoteSpendWidget>
      }
      { qc.motes_peripheral_total > 0 &&
        <MoteSpendWidget qc peripheral character={ qc }>
          <ResourceDisplay className={ classes.moteWrap }
            current={ qc.motes_peripheral_current }
            total={ qc.motes_peripheral_total }
            label="Peripheral:"
          />
        </MoteSpendWidget>
      }
      <ResourceDisplay className={ classes.moteWrap }
        current={ qc.willpower_temporary }
        total={ qc.willpower_permanent }
        label="Willpower:"
      />
    </div>

    <HealthLevelBoxes character={ qc } />

    <Typography paragraph>
      <strong>Penalties:</strong>&nbsp;

      Onslaught -{ qc.onslaught },&nbsp;
      Wound -{ woundPenalty(qc, []) }
    </Typography>
  </Paper>
}
QcCard.propTypes = {
  qc: PropTypes.shape(fullQc).isRequired,
  player: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(QcCard)
