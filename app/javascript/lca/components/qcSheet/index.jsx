import React from 'react'
import { connect } from 'react-redux'

import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'
import QcEditorPopup from './qcEditorPopup.jsx'

import { updateQc } from '../../actions'

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

class QcSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { qc, qc_merits, qc_attacks } = this.props
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

    return(<div className="qcSheet">
      <h1>{ qc.name } <QcEditorPopup qc={ qc } attacks={ qc_attacks } merits={ qc_merits } /></h1>

      <div>
        <strong>Essence:</strong> { qc.essence },
        <strong>Willpower</strong> { qc.willpower_temporary } / { qc.willpower_permanent }<br />
        <MotePool qc={ qc } />
        <HealthLevelBoxes character={ qc } />
      </div>
      <div>
        <strong>Join Battle:</strong> { qc.join_battle } dice,
        <strong>Combat Movement:</strong> { qc.movement } dice,
        <strong>Soak:</strong> { qc.soak }({qc.armor_name}),
        {qc.hardness > 0 &&
          <span><strong>Hardness:</strong> { qc.hardness },</span>
        }
        <strong>Parry:</strong> { qc.parry },
        <strong>Evasion:</strong> { qc.evasion }<br />
        <strong>Attacks:</strong>
        { qc.grapple > 0 &&
          <span>Grapple: { qc.grapple } ({ qc.grapple_control} dice to control)</span>
        }
        { attacks }
      </div>
      <div>
        <strong>Resolve:</strong> { qc.resolve },
        <strong>Guile:</strong> { qc.guile },
        <strong>Appearance:</strong> { qc.appearance }<br />
        <strong>Actions:</strong>
        Senses: { qc.senses },{' '}
        { actions }
      </div>

      <div>
        <h4 style={{ marginBottom: '0.25em' }}>Merits:</h4>
        { merits }
      </div>
    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  const qc = state.entities.qcs[ownProps.match.params.qcId]

  let qc_attacks = []
  let qc_merits = []

  if (qc != undefined && qc.qc_attacks != undefined) {
    qc_attacks = qc.qc_attacks.map((id) => state.entities.qc_attacks[id])
  }
  if (qc != undefined && qc.qc_merits != undefined) {
    qc_merits = qc.qc_merits.map((id) => state.entities.qc_merits[id])
  }

  const { isFetching, isError } = state.app
  return {
    qc,
    qc_attacks,
    qc_merits,
    isFetching,
    isError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQc: (id, trait, value) => {
      dispatch(updateQc(id, trait, value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QcSheet)
