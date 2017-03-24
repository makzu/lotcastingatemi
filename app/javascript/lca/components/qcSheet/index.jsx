import React from 'react'
import { connect } from 'react-redux'

import HealthLevelBoxes from '../generic/HealthLevelBoxes.jsx'

import { updateQc } from '../../actions'

function MotePool(props){
  const { qc } = props

  if (qc.motes_personal_total == 0) {
    return(<span />)
  } else if (qc.motes_peripheral_total == 0) {
    return(<span>

    </span>)
  }
}

class QcSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { qc } = this.props
    if (this.props.qc == undefined) {
      return(<div>
        <h1>QC Editor</h1>
        <p>The QC has not yet loaded.</p>
      </div>)
    }

    return(<div className="qcSheet">
      <h1>{ this.props.qc.name }</h1>

      <div className="">
        <strong>Essence:</strong> { qc.essence },
        <strong>Willpower</strong> { qc.willpower_temporary } / { qc.willpower_permanent }<br />
        <strong>Join Battle:</strong> { qc.join_battle } dice<br />
        <MotePool qc={ qc } />
        <HealthLevelBoxes character={ qc } />
        <strong>Movement:</strong> { qc.movement }<br />
        <strong>Soak:</strong> { qc.soak }({qc.armor_name})<br />
        <strong>Parry:</strong> { qc.parry }<br />
        <strong>Resolve:</strong> { qc.resolve }<br />
        <strong>Guile:</strong> { qc.guile }<br />
        <strong>Appearance:</strong> { qc.appearance }<br />
      </div>

    </div>)
  }
}

function mapStateToProps(state, ownProps) {
  const qc = state.character.qcs[ownProps.match.params.qcId]

  const { isFetching, isError } = state.app
  return {
    qc,
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
