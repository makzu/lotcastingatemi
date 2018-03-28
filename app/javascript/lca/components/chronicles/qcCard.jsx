import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Launch from 'material-ui-icons/Launch'
import VisibilityOff from 'material-ui-icons/VisibilityOff'

import PlayerNameSubtitle from './playerNameSubtitle.jsx'
import PoolLine from '../characters/PoolLine.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget.jsx'
import { canIEditQc, getPenaltiesForQc, getPoolsAndRatingsForQc } from '../../selectors'
import { qcPool } from '../../utils/calculated'
import { fullQc } from '../../utils/propTypes'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
  nameRow: {
    display: 'flex',
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
  poolBlock: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    width: '4.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

function QcCard({ qc, penalties, pools, canIEdit, classes }) {
  return <Paper className={ classes.root }>

    <div className={ classes.nameRow }>
      <div className={ classes.nameWrap }>
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
      </div>

      { canIEdit &&
        <CharacterCardMenu characterType="qc" id={ qc.id } />
      }
    </div>

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
      <WillpowerSpendWidget qc character={ qc }>
        <ResourceDisplay className={ classes.moteWrap }
          current={ qc.willpower_temporary }
          total={ qc.willpower_permanent }
          label="Willpower:"
        />
      </WillpowerSpendWidget>
    </div>

    <HealthLevelBoxes character={ qc } />

    <div className={ classes.rowContainer }>
      <PoolLine pool={ pools.evasion } label="Evasion" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.parry } label="Parry" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={{ total: qc.soak }} label="Soak" classes={{ root: classes.poolBlock }} />
      { qc.hardness.total > 0 &&
        <PoolLine pool={{ total: qc.hardness }} label="Hardness" classes={{ root: classes.poolBlock }} />
      }
      <PoolLine pool={ qcPool(qc, qc.join_battle, penalties.wound) } label="Join Battle" classes={{ root: classes.poolBlock }} />
    </div>

    <div className={ classes.rowContainer }>
      <PoolLine pool={ pools.resolve } label="Resolve" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.guile } label="Guile" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ pools.appearance } label="Appearance" classes={{ root: classes.poolBlock }} />
      <PoolLine pool={ qcPool(qc, qc.senses, penalties.wound) } label="Senses" classes={{ root: classes.poolBlock }} />
    </div>

    <Typography paragraph>
      <strong>Penalties:</strong>&nbsp;

      Onslaught -{ penalties.onslaught },&nbsp;
      Wound -{ penalties.wound }
    </Typography>
  </Paper>
}
QcCard.propTypes = {
  qc: PropTypes.shape(fullQc).isRequired,
  penalties: PropTypes.object,
  pools: PropTypes.object,
  player: PropTypes.object,
  canIEdit: PropTypes.bool,
  classes: PropTypes.object,
}
function mapStateToProps(state, props) {
  return {
    penalties: getPenaltiesForQc(state, props.qc.id),
    pools: getPoolsAndRatingsForQc(state, props.qc.id),
    canIEdit: canIEditQc(state, props.qc.id),
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QcCard))
