// @flow
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SortableHandle } from 'react-sortable-hoc'
import { compose } from 'recompose'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import PlayerNameSubtitle from '../generic/PlayerNameSubtitle.jsx'
import CharacterMenu from '../generic/CharacterMenu'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import { doIOwnQc, getPenaltiesForQc, getPoolsAndRatingsForQc } from 'selectors'
import type { fullQc, Enhancer } from 'utils/flow-types'

const Handle = SortableHandle(() => (
  <DragHandleIcon onClick={(e) => e.preventDefault()} />
))

const styles = (theme) => ({
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
  icon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing(),
  },
  rowContainer: {
    display: 'flex',
    flexWrap: 'wrap',
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
  chronicle?: boolean,
  st?: boolean,
}
type Props = ExposedProps & {
  penalties: Object,
  pools: Object,
  isOwner: boolean,
  classes: Object,
}

function QcCard(props: Props) {
  const { qc, chronicle, st, penalties, pools, isOwner, classes } = props

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

      <Typography component="div" className={classes.nameRow}>
        <div className={classes.nameWrap}>
          <Typography
            variant="h6"
            className={classes.qcName}
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

          {qc.description && (
            <Typography variant="caption" component="div">
              {qc.description.substring(0, 160)}
            </Typography>
          )}

          {chronicle && <PlayerNameSubtitle playerId={qc.player_id} />}
        </div>

        <CharacterMenu characterType="qc" id={qc.id} chronicle={chronicle} />
      </Typography>

      {/* $FlowFixMe */}
      <SpendableBlock character={qc} qc />

      <div className={classes.rowContainer}>
        <PoolDisplay
          pool={pools.joinBattle}
          label="Join Battle"
          classes={{ root: classes.poolBlock }}
        />
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

      <div className={classes.rowContainer}>
        <PoolDisplay
          pool={pools.senses}
          label="Senses"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.resolve}
          label="Resolve"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.guile}
          label="Guile"
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          pool={pools.appearance}
          label="Appearance"
          classes={{ root: classes.poolBlock }}
        />
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
    </Paper>
  )
}

const mapStateToProps = (state, props) => ({
  penalties: getPenaltiesForQc(state, props.qc.id),
  pools: getPoolsAndRatingsForQc(state, props.qc.id),
  isOwner: doIOwnQc(state, props.qc.id),
})

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps),
  withStyles(styles),
)

export default enhance(QcCard)
