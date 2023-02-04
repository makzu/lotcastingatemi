// @flow
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Typography from '@mui/material/Typography'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CombatControls from './CombatControls.jsx'
import RemoveFromCombatButton from './RemoveFromCombatButton.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import CardBase from 'components/shared/CardBase'
import sharedStyles from 'styles/'
import { getPenaltiesForQc, getPoolsAndRatingsForQc } from 'selectors'
import type { fullQc, Enhancer } from 'utils/flow-types'

const styles = (theme) => ({
  ...sharedStyles(theme),
  nameWrap: {
    flex: 1,
    '& a': {
      color: 'unset',
    },
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
  hasActed: {
    textDecoration: 'none',
    opacity: 0.5,
  },
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing(),
  },
  poolBlock: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    width: '4.5rem',
    maxHeight: '5.5rem',
    overflow: 'hidden',
  },
})

type ExposedProps = {
  qc: fullQc,
}
type Props = ExposedProps & {
  penalties: object,
  pools: object,
  classes: object,
}

function QcCard(props: Props) {
  const { qc, penalties, pools, classes } = props

  return (
    <CardBase>
      <div className={classes.flexContainer}>
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
            className={qc.has_acted ? classes.hasActed : classes.qcName}
            component={Link}
            to={`/qcs/${qc.id}`}
          >
            {qc.name}

            {qc.hidden && (
              <div className={classes.hiddenLabel}>
                <VisibilityOff className={classes.icon} />
                Hidden
              </div>
            )}
          </Typography>

          <PlayerNameSubtitle playerId={qc.player_id} />
        </div>
      </div>

      <CombatControls character={qc} characterType="qc" />

      {/* $FlowFixMe */}
      <SpendableBlock character={qc} qc />

      <div className={classes.flexContainerWrap}>
        <PoolDisplay
          pool={pools.evasion}
          label="Evasion"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.parry}
          label="Parry"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          noSummary
          pool={{ total: qc.soak }}
          label="Soak"
          classes={{ root: classes.poolBlock }}
        />
        {qc.hardness > 0 && (
          <PoolDisplay
            noSummary
            pool={{ total: qc.hardness }}
            label="Hardness"
            classes={{ root: classes.poolBlock }}
          />
        )}
      </div>

      {(penalties.mobility > 0 ||
        penalties.onslaught > 0 ||
        penalties.wound > 0) && (
        <Typography paragraph style={{ marginTop: '0.5em' }}>
          <strong>Penalties:</strong>
          &nbsp;
          {penalties.mobility > 0 && (
            <span>Mobility -{penalties.mobility} </span>
          )}
          {penalties.onslaught > 0 && (
            <span>Onslaught -{penalties.onslaught} </span>
          )}
          {penalties.wound > 0 && <span>Wound -{penalties.wound}</span>}
        </Typography>
      )}

      <RemoveFromCombatButton character={qc} characterType="qc" />
    </CardBase>
  )
}

const mapStateToProps = (state, props: ExposedProps) => ({
  penalties: getPenaltiesForQc(state, props.qc.id),
  pools: getPoolsAndRatingsForQc(state, props.qc.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles),
)

export default enhance(QcCard)
