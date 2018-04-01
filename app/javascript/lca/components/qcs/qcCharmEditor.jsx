import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import ContentAddCircle from 'material-ui-icons/AddCircle'

import QcCharmFields from './qcCharmFields.jsx'

import { createQcCharm, destroyQcCharm, updateQcCharm } from '../../ducks/actions.js'
import { getCharmsForQc } from '../../selectors'
import { fullQc, qcCharm } from '../../utils/propTypes'

class QcCharmEditor extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleChange(id, trait, value) {
    this.props.updateQcCharm(id, this.props.qc.id, trait, value)
  }

  handleAdd() {
    this.props.addQcCharm(this.props.qc.id)
  }

  handleRemove(id) {
    this.props.removeQcCharm(id, this.props.qc.id)
  }
  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcCharms = this.props.qc_charms.map((charm) =>
      <QcCharmFields key={ charm.id } charm={ charm } qc={ this.props.qc }
        onCharmChange={ handleChange } onRemoveClick={ handleRemove }
      />
    )

    return <div>
      <Typography variant="title">
        Charms

        <Button onClick={ handleAdd }>
          Add Charm
          <ContentAddCircle  />
        </Button>
      </Typography>

      { qcCharms }
    </div>
  }
}
QcCharmEditor.propTypes = {
  qc: PropTypes.shape(fullQc),
  qc_charms: PropTypes.arrayOf(PropTypes.shape(qcCharm)),
  updateQcCharm: PropTypes.func,
  addQcCharm: PropTypes.func,
  removeQcCharm: PropTypes.func,
}

function mapStateToProps(state, ownProps) {
  const qc = ownProps.qc
  let qc_charms = []

  if (qc != undefined)
    qc_charms = getCharmsForQc(state, qc.id)

  return {
    qc_charms
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateQcCharm: (id, qcId, trait, value) => {
      dispatch(updateQcCharm(id, qcId, trait, value))
    },
    addQcCharm: (qcId) => {
      dispatch(createQcCharm(qcId))
    },
    removeQcCharm: (id, qcId) => {
      dispatch(destroyQcCharm(id, qcId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QcCharmEditor)
