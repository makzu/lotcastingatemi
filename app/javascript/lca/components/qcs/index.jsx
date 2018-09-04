// @flow
import React, { Component, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import BlockPaper from '../generic/blockPaper.jsx'
import PoolDisplay from '../generic/PoolDisplay.jsx'
import SpendableBlock from '../generic/SpendableBlock.jsx'
import sharedStyles from 'styles/'

import ProtectedComponent from 'containers/ProtectedComponent.jsx'
import {
  canIEditQc,
  getSpecificQc,
  getAttacksForQc,
  getMeritsForQc,
  getCharmsForQc,
  getPenaltiesForQc,
  getPoolsAndRatingsForQc,
} from 'selectors'
import { prettyIntimacyRating, qcPool } from 'utils/calculated'
import type { fullQc, QcMerit, QcAttack, QcCharm } from 'utils/flow-types'

const styles = theme => ({
  ...sharedStyles(theme),
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
  intimacy: {
    ...theme.typography.body1,
  },
  intimacyTypeLabel: {
    ...theme.typography.caption,
  },
  label: {
    ...theme.typography.body1,
    fontSize: '0.75rem',
    fontWeight: 500,
    opacity: 0.7,
    width: '5em',
    display: 'flex',
  },
  labelSpan: {
    alignSelf: 'flex-end',
  },
  name: {
    ...theme.typography.body2,
    width: '10rem',
    margin: theme.spacing.unit,
    marginLeft: 0,
    maxHeight: '5rem',
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
  tags: {
    ...theme.typography.body1,
    margin: theme.spacing.unit,
    marginLeft: 0,
    textTransform: 'capitalize',
    maxHeight: '5rem',
    overflow: 'hidden',
  },
})

type Props = {
  id: string,
  qc: fullQc,
  qc_merits: Array<QcMerit>,
  qc_charms: Array<QcCharm>,
  qc_attacks: Array<QcAttack>,
  pools: Object,
  penalties: Object,
  classes: Object,
  canEdit: boolean,
  loading: boolean,
}

class QcSheet extends Component<Props> {
  render() {
    /* Escape hatch */
    if (this.props.qc == undefined)
      return (
        <Typography paragraph>
          {this.props.loading
            ? 'This QC has not yet loaded.'
            : 'Could not load QC. It may not be publicly viewable.'}
        </Typography>
      )

    const {
      qc,
      qc_attacks,
      qc_charms,
      qc_merits,
      pools,
      penalties,
      canEdit,
      classes,
    } = this.props

    const actions = qc.actions.map((action, index) => (
      <PoolDisplay
        key={index}
        label={action.action}
        pool={qcPool(qc, action.pool, penalties.wound)}
        classes={{ root: classes.poolBlock }}
      />
    ))
    const principles = qc.principles.map(
      (p, index) =>
        p.hidden && !canEdit ? (
          <span key={index} />
        ) : (
          <div key={index}>
            <span className={classes.intimacyTypeLabel}>Principle: </span>
            <span className={classes.intimacy}>
              {p.subject} ({prettyIntimacyRating(p.rating)})
            </span>
          </div>
        )
    )
    const ties = qc.ties.map(
      (tie, index) =>
        tie.hidden && !canEdit ? (
          <span key={index} />
        ) : (
          <div key={index}>
            <span className={classes.intimacyTypeLabel}>Tie: </span>
            <span className={classes.intimacy}>
              {tie.subject} ({prettyIntimacyRating(tie.rating)})
            </span>
          </div>
        )
    )
    const attacks = qc_attacks.map(attack => (
      <div key={attack.id} className={classes.rowContainer}>
        <div className={classes.name}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Name</span>
          </div>
          {attack.name}
        </div>

        <PoolDisplay
          label="Attack"
          pool={qcPool(qc, attack.pool, penalties.wound)}
          classes={{ root: classes.poolBlock }}
        />
        <PoolDisplay
          label="damage"
          damage
          pool={{ total: attack.damage }}
          classes={{ root: classes.poolBlock }}
        />
        {attack.overwhelming > 1 && (
          <PoolDisplay
            noSummary
            label="Minimum"
            damage
            pool={{ total: attack.overwhelming }}
            classes={{ root: classes.poolBlock }}
          />
        )}

        <div className={classes.tags}>
          <div className={classes.label}>
            <span className={classes.labelSpan}>Range</span>
          </div>
          {attack.range}
        </div>

        {attack.tags.length > 0 && (
          <div className={classes.tags}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>Tags</span>
            </div>
            {attack.tags.join(', ') || 'none'}
          </div>
        )}
      </div>
    ))
    const merits = qc_merits.map(merit => (
      <div key={merit.id}>
        <strong>{merit.name} </strong>
        <ReactMarkdown source={merit.body} className={classes.markdown} />
      </div>
    ))
    const charms = qc_charms.map(charm => (
      <div key={charm.id}>
        <strong>{charm.name} </strong>({charm.cost}; {charm.timing};{' '}
        {charm.duration}; Essence&nbsp;
        {charm.min_essence}
        )&nbsp;
        <ReactMarkdown source={charm.body} className={classes.markdown} />
      </div>
    ))

    return (
      <BlockPaper>
        <Typography component="div">
          <ReactMarkdown
            source={qc.description || 'No Description'}
            className={classes.markdown}
          />
        </Typography>

        <div className={classes.rowContainer}>
          <PoolDisplay
            label="Essence"
            pool={{ total: qc.essence }}
            noSummary
            classes={{ root: classes.poolBlock }}
          />

          <SpendableBlock character={qc} qc />
        </div>

        <Typography variant="subheading">Combat</Typography>
        <div className={classes.rowContainer}>
          <PoolDisplay
            label="Join Battle"
            pool={qcPool(qc, qc.join_battle, penalties.wound)}
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            label="Movement"
            pool={qcPool(qc, qc.movement, penalties.wound)}
            classes={{ root: classes.poolBlock }}
          />
        </div>

        <Typography variant="subheading">Attacks</Typography>
        {attacks.length == 0 && <Typography paragraph>None</Typography>}
        {attacks}
        {qc.grapple > 0 && (
          <div className={classes.rowContainer}>
            <div className={classes.name}>
              <div className={classes.label}>
                <span className={classes.labelSpan}>Name</span>
              </div>
              Grapple
            </div>
            <PoolDisplay
              label="Grapple"
              pool={qcPool(qc, qc.grapple, penalties.wound)}
              classes={{ root: classes.poolBlock }}
            />
            <PoolDisplay
              label="Control"
              pool={qcPool(qc, qc.grapple_control, penalties.wound)}
              classes={{ root: classes.poolBlock }}
            />
          </div>
        )}

        <Typography variant="subheading">Defenses</Typography>
        <div className={classes.rowContainer}>
          <PoolDisplay
            label="Evasion"
            pool={pools.evasion}
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            label="Parry"
            pool={pools.parry}
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            noSummary
            label="Soak"
            pool={{ total: qc.soak }}
            classes={{ root: classes.poolBlock }}
          />
          {qc.hardness > 0 && (
            <PoolDisplay
              noSummary
              label="Hardness"
              pool={{ total: qc.hardness }}
              classes={{ root: classes.poolBlock }}
            />
          )}
          <div className={classes.tags}>
            <div className={classes.label}>
              <span className={classes.labelSpan}>Armor Name</span>
            </div>
            {qc.armor_name || 'unarmored'}
          </div>
        </div>

        <Typography variant="subheading">Actions</Typography>
        <div className={classes.rowContainer}>
          <PoolDisplay
            label="Senses"
            pool={pools.senses}
            classes={{ root: classes.poolBlock }}
          />
          {actions}
        </div>

        <Typography variant="subheading">Social</Typography>
        <div className={classes.rowContainer}>
          <PoolDisplay
            label="Resolve"
            pool={pools.resolve}
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            label="Guile"
            pool={pools.guile}
            classes={{ root: classes.poolBlock }}
          />
          <PoolDisplay
            label="Appearance"
            pool={pools.appearance}
            classes={{ root: classes.poolBlock }}
          />
        </div>

        <Typography variant="subheading">Intimacies</Typography>
        <Typography gutterBottom component="div">
          {principles.length == 0 && ties.length == 0 && 'No Intimacies'}
          {principles}
          {ties}
        </Typography>

        <Typography variant="subheading">Merits</Typography>
        <Typography gutterBottom component="div">
          {merits}
        </Typography>

        {charms.length > 0 && (
          <Fragment>
            <Typography variant="subheading">Charms</Typography>
            <Typography component="div">{charms}</Typography>
          </Fragment>
        )}
      </BlockPaper>
    )
  }
}

function mapStateToProps(state, props) {
  const id = props.match.params.qcId
  const qc = getSpecificQc(state, id)

  let qc_attacks = []
  let qc_charms = []
  let qc_merits = []
  let pools = {}
  let penalties = {}

  if (qc != undefined) {
    qc_attacks = getAttacksForQc(state, id)
    qc_charms = getCharmsForQc(state, id)
    qc_merits = getMeritsForQc(state, id)

    penalties = getPenaltiesForQc(state, id)
    pools = getPoolsAndRatingsForQc(state, id)
  }

  return {
    id,
    qc,
    qc_attacks,
    qc_charms,
    qc_merits,
    penalties,
    pools,
    canEdit: canIEditQc(state, id),
    loading: state.app.loading,
  }
}

export default ProtectedComponent(
  withStyles(styles)(connect(mapStateToProps)(QcSheet))
)
