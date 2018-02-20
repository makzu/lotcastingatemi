import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'

import { fullQc, withMotePool, qcMerit, qcAttack } from '../../utils/propTypes'
import { prettyIntimacyRating } from '../../utils/calculated'

function MotePool(props){
  const { qc } = props

  if (qc.motes_personal_total > 0) {
    return(<span>
      <span>Personal motes: {qc.motes_personal_current}/{qc.motes_personal_total}</span>
      {qc.motes_peripheral_total > 0 &&
        <span>Peripheral motes: {qc.motes_peripheral_current}/{qc.motes_peripheral_total}</span>
      }
    </span>)
  } else {
    return null
  }
}
MotePool.propTypes = {
  qc: PropTypes.shape(withMotePool)
}

class QcSheet extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    /* Escape hatch */
    if (this.props.qc == undefined) {
      return(<div>
        <Typography paragraph>This QC has not yet loaded.</Typography>
      </div>)
    }

    const { qc, qc_attacks, qc_charms, qc_merits } = this.props

    const actions = qc.actions.map((action, index) =>
      <span key={index}>, {action.action}: {action.pool}</span>
    )
    const principles = qc.principles.map((p, index) =>
      <div key={index}><small>Principle: </small>{ p.subject } ({ prettyIntimacyRating(p.rating) })</div>
    )
    const ties = qc.ties.map((tie, index) =>
      <div key={index}><small>Tie:</small>{ tie.subject } ({ prettyIntimacyRating(tie.rating) })</div>
    )
    const attacks = qc_attacks.map((attack) =>
      <div key={attack.id}>
        {attack.name}: {attack.pool} dice
        ({attack.damage} damage{ attack.overwhelming > 1 && <span>, minimum {attack.overwhelming}</span>})
        , { attack.range } range
        { attack.tags.length > 0 && <span>, tags: {attack.tags.join(', ')}</span>}
      </div>
    )
    const merits = qc_merits.map((merit) =>
      <div key={merit.id}>
        <strong>{merit.name}: </strong>{ merit.body }
      </div>
    )
    const charms = qc_charms.map((charm) =>
      <div key={ charm.id }>
        <strong>{ charm.name } </strong>
        (
        { charm.cost }; { charm.timing }; { charm.duration };
        Essence { charm.min_essence }
        )
        { charm.body }
      </div>
    )

    return(<div>
      <Typography variant="headline" gutterBottom>
        { qc.name }
        <Button component={ Link } to={`/qcs/${qc.id}/edit`}>Edit</Button>
      </Typography>

      <Typography component="div">
        <strong>Essence:</strong> { qc.essence }, {' '}
        <strong>Willpower</strong> { qc.willpower_temporary }/{ qc.willpower_permanent }, {' '}
        <strong>Join Battle:</strong> { qc.join_battle } dice
        <br />
        <MotePool qc={ qc } />
        <HealthLevelBoxes character={ qc } />
      </Typography>

      <Typography component="div">
        <strong>Combat Movement:</strong> { qc.movement } dice, {' '}
        <strong>Soak:</strong> { qc.soak } ({ qc.armor_name || 'unarmored' }), {' '}
        {qc.hardness > 0 &&
          <span><strong>Hardness:</strong> { qc.hardness }, </span>
        }
        <strong>Parry:</strong> { qc.parry }, {' '}
        <strong>Evasion:</strong> { qc.evasion }<br />
        <strong>Attacks:</strong>
        { qc.grapple > 0 &&
          <div>Grapple: { qc.grapple } ({ qc.grapple_control} dice to control)</div>
        }
        { attacks }
      </Typography>

      <Typography component="div">
        <strong>Resolve:</strong> { qc.resolve }, {' '}
        <strong>Guile:</strong> { qc.guile }, {' '}
        <strong>Appearance:</strong> { qc.appearance }<br />
        <strong>Actions: </strong>
        Senses: { qc.senses }
        { actions }
      </Typography>

      <Typography component="div">
        <h4 style={{ marginBottom: '0.25em' }}>Intimacies:</h4>
        { principles }
        { ties }
      </Typography>

      <Typography component="div">
        <h4 style={{ marginBottom: '0.25em' }}>Merits:</h4>
        { merits }
      </Typography>

      { charms.length > 0 && <Typography component="div">
        <h4 style={{ marginBottom: '0.25em' }}>Charms:</h4>
        { charms }
      </Typography> }

    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.qcId
  const qc = state.entities.qcs[id]

  let qc_attacks = []
  let qc_charms = []
  let qc_merits = []

  if (qc != undefined) {
    if (qc.qc_attacks != undefined) {
      qc_attacks = qc.qc_attacks.map((id) => state.entities.qc_attacks[id])
    }
    if (qc.qc_charms != undefined) {
      qc_charms = qc.qc_charms.map((id) => state.entities.qc_charms[id])
    }
    if (qc.qc_merits != undefined) {
      qc_merits = qc.qc_merits.map((id) => state.entities.qc_merits[id])
    }
  }

  return {
    id,
    qc,
    qc_attacks,
    qc_charms,
    qc_merits,
  }
}
QcSheet.propTypes = {
  id: PropTypes.string.isRequired,
  qc: PropTypes.shape(fullQc),
  qc_merits: PropTypes.arrayOf(PropTypes.shape(qcMerit)),
  qc_charms: PropTypes.arrayOf(PropTypes.object),
  qc_attacks: PropTypes.arrayOf(PropTypes.shape(qcAttack)),
  battlegroups: PropTypes.arrayOf(PropTypes.object),
}

export default connect(
  mapStateToProps
)(QcSheet)
