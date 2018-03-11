import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import QcMeritFields from './qcMeritFields.jsx'

import { createQcMerit, destroyQcMerit, updateQcMerit } from '../../ducks/actions.js'
import { fullQc, qcMerit } from '../../utils/propTypes'

class QcMeritEditor extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(id, trait, value) {
    this.props.updateQcMerit(id, this.props.qc.id, trait, value)
  }

  handleAdd() {
    this.props.addQcMerit(this.props.qc.id)
  }

  handleRemove(id) {
    this.props.removeQcMerit(id, this.props.qc.id)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcMerits = this.props.qc_merits.map((merit) =>
      <QcMeritFields key={ merit.id } merit={ merit } qc={ this.props.qc }
        onMeritChange={ handleChange } onRemoveClick={ handleRemove }
      />
    )

    return <div style={{ marginTop: '1em' }}>
      <Typography variant="subheading">
        Merits

        <Button onClick={ handleAdd }>
          Add Merit
          <ContentAddCircle  />
        </Button>
      </Typography>

      { qcMerits }
    </div>
  }
}
QcMeritEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  qc_merits: PropTypes.arrayOf(PropTypes.shape(qcMerit)),
  updateQcMerit: PropTypes.func,
  addQcMerit: PropTypes.func,
  removeQcMerit: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const qc = ownProps.qc
  let qc_merits = []

  if (qc != undefined) {
    if (qc.qc_merits != undefined) {
      qc_merits = qc.qc_merits.map((id) => state.entities.qc_merits[id])
    }
  }

  return {
    qc_merits
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQcMerit: (id, qcId, trait, value) => {
      dispatch(updateQcMerit(id, qcId, trait, value))
    },
    addQcMerit: (qcId) => {
      dispatch(createQcMerit(qcId))
    },
    removeQcMerit: (id, qcId) => {
      dispatch(destroyQcMerit(id, qcId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcMeritEditor)
