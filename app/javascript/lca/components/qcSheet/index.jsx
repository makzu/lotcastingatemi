import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'

import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import QcEditorPopup from './qcEditorPopup.jsx'

import { fetchQc, updateQc } from '../../ducks/actions.js'
import { fullQc, withMotePool, qcMerit, qcAttack } from '../../utils/propTypes'

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
    const { qc, qc_attacks, qc_charms, qc_merits } = this.props
    if (this.props.qc == undefined) {
      return(<div>
        <h1>QC Editor</h1>
        <p>The QC has not yet loaded.</p>
      </div>)
    }

    const actions = qc.actions.map((action, index) =>
      <span key={index}>{action.action}: {action.pool} </span>
    )
    const attacks = qc_attacks.map((attack) =>
      <div key={attack.id}>
        {attack.name}: {attack.pool} dice
        ({attack.damage} damage{ attack.overwhelming > 1 && <span>, minimum {attack.overwhelming}</span>})
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

    return(<div className="qcSheet">
      <h1>{ qc.name } <QcEditorPopup qc={ qc } attacks={ qc_attacks } merits={ qc_merits } /></h1>

      <div>
        <strong>Essence:</strong> { qc.essence }, {' '}
        <strong>Willpower</strong> { qc.willpower_temporary } / { qc.willpower_permanent }<br />
        <MotePool qc={ qc } />
        <HealthLevelBoxes character={ qc } />
      </div>
      <div>
        <strong>Join Battle:</strong> { qc.join_battle } dice, {' '}
        <strong>Combat Movement:</strong> { qc.movement } dice, {' '}
        <strong>Soak:</strong> { qc.soak } ({ qc.armor_name || 'unarmored' }), {' '}
        {qc.hardness > 0 &&
          <span><strong>Hardness:</strong> { qc.hardness }, </span>
        }
        <strong>Parry:</strong> { qc.parry }, {' '}
        <strong>Evasion:</strong> { qc.evasion }<br />
        <strong>Attacks:</strong>
        { qc.grapple > 0 &&
          <span>Grapple: { qc.grapple } ({ qc.grapple_control} dice to control)</span>
        }
        { attacks }
      </div>
      <div>
        <strong>Resolve:</strong> { qc.resolve }, {' '}
        <strong>Guile:</strong> { qc.guile }, {' '}
        <strong>Appearance:</strong> { qc.appearance }<br />
        <strong>Actions:</strong>
        Senses: { qc.senses }, {' '}
        { actions }
      </div>

      <div>
        <h4 style={{ marginBottom: '0.25em' }}>Merits:</h4>
        { merits }
      </div>

      { charms.length > 0 && <div>
        <h4 style={{ marginBottom: '0.25em' }}>Charms:</h4>
        { charms }
      </div> }

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
  updateQc: PropTypes.func,
  fetchQc: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQc: (id) => {
      dispatch(fetchQc(id))
    },
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QcSheet)
