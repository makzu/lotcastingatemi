// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import Launch from '@material-ui/icons/Launch'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CharacterCardMenu from '../generic/CharacterCardMenu'
import DamageWidget from '../generic/DamageWidget.jsx'
import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import InitiativeWidget from '../generic/InitiativeWidget.jsx'
import MoteSpendWidget from '../generic/MoteSpendWidget.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import ResourceDisplay from '../generic/ResourceDisplay.jsx'
import WillpowerSpendWidget from '../generic/WillpowerSpendWidget.jsx'
import { doIOwnQc, getPenaltiesForQc, getPoolsAndRatingsForQc } from 'selectors'
import { qcPool } from 'utils/calculated'
import type { fullQc } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={e => e.preventDefault()} />
))

const styles = theme => ({
  root: {
    ...theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    }),
    height: '100%',
    position: 'relative',
  },
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

type Props = {
  qc: fullQc,
  combat?: boolean,
  chronicle?: boolean,
  st?: boolean,
  penalties: Object,
  pools: Object,
  player: Object,
  isOwner: boolean,
  classes: Object,
}

function QcCard(props: Props) {
  const {
    qc,
    combat,
    chronicle,
    st,
    penalties,
    pools,
    isOwner,
    classes,
  } = props

  return (
    <Paper className={classes.root}>
      {((chronicle && st) || (!chronicle && isOwner)) && (
        <Typography
          component="div"
          style={{ position: 'absolute', bottom: '0.5em', right: '0.75em' }}
        >
          <Handle />
        </Typography>
      )}

      <div className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="title"
            className={classes.qcName}
            component={Link}
            to={`/qcs/${qc.id}`}
          >
            {qc.name}

            <Launch className={classes.icon} />
            {qc.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={qc.player_id} />
        </div>

        {isOwner && <CharacterCardMenu characterType="qc" id={qc.id} />}
      </div>

      <div className={classes.rowContainer}>
        {qc.motes_personal_total > 0 && (
          <MoteSpendWidget qc character={qc}>
            <ResourceDisplay
              className={classes.moteWrap}
              current={qc.motes_personal_current}
              total={qc.motes_personal_total}
              label="Personal:"
            />
          </MoteSpendWidget>
        )}
        {qc.motes_peripheral_total > 0 && (
          <MoteSpendWidget qc peripheral character={qc}>
            <ResourceDisplay
              className={classes.moteWrap}
              current={qc.motes_peripheral_current}
              total={qc.motes_peripheral_total}
              label="Peripheral:"
            />
          </MoteSpendWidget>
        )}
        <WillpowerSpendWidget qc character={qc}>
          <ResourceDisplay
            className={classes.moteWrap}
            current={qc.willpower_temporary}
            total={qc.willpower_permanent}
            label="Willpower:"
          />
        </WillpowerSpendWidget>
      </div>

      <DamageWidget qc character={qc}>
        <HealthLevelBoxes character={qc} />
      </DamageWidget>

      <div className={classes.rowContainer}>
        <PoolDisplay
          staticRating
          qc
          pool={pools.evasion}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          qc
          pool={pools.parry}
          label="Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          staticRating
          qc
          pool={{ total: qc.soak }}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {qc.hardness > 0 && (
          <PoolDisplay
            staticRating
            qc
            pool={{ total: qc.hardness }}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
        <PoolDisplay
          qc
          pool={qcPool(qc, qc.join_battle, penalties.wound)}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
      </div>

      {!combat && (
        <div className={classes.rowContainer}>
          <PoolDisplay
            staticRating
            qc
            pool={pools.resolve}
            label="Resolve"
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            staticRating
            qc
            pool={pools.guile}
            label="Guile"
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            staticRating
            qc
            pool={pools.appearance}
            label="Appearance"
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            qc
            pool={pools.senses}
            label="Senses"
            classes={{ root: classes.poolBlock }}
          />
        </div>
      )}

      {(penalties.mobility > 0 ||
        penalties.onslaught > 0 ||
        penalties.wound > 0) && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>&nbsp;
          {penalties.mobility > 0 && (
            <span>Mobility -{penalties.mobility} </span>
          )}
          {penalties.onslaught > 0 && (
            <span>Onslaught -{penalties.onslaught} </span>
          )}
          {penalties.wound > 0 && <span>Wound -{penalties.wound}</span>}
        </Typography>
      )}

      {combat && <InitiativeWidget character={qc} characterType="qc" />}
    </Paper>
  )
}
function mapStateToProps(state, props) {
  return {
    penalties: getPenaltiesForQc(state, props.qc.id),
    pools: getPoolsAndRatingsForQc(state, props.qc.id),
    isOwner: doIOwnQc(state, props.qc.id),
  }
}

export default withStyles(styles)(connect(mapStateToProps)(QcCard))
