import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'

import { updateQc } from '../../actions'

class QcSheet extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.qc == undefined) {
      return(<Paper>
        <h1>QC Editor</h1>
        <p>The QC has not yet loaded.</p>
      </Paper>)
    }

    return(
      <Paper >
        <h1>{ this.props.qc.name }</h1>
      </Paper>
    )
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
