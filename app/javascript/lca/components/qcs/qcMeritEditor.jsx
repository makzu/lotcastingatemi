// @flow
import React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import QcMeritFields from './qcMeritFields.jsx'

import { createQcMerit, destroyQcMerit, updateQcMerit } from 'ducks/actions.js'
import { getMeritsForQc } from 'selectors'
import type { fullQc, QcMerit, Enhancer } from 'utils/flow-types'

type ExposedProps = {
  qc: fullQc,
}
type Props = ExposedProps & {
  qc_merits: Array<QcMerit>,
  updateQcMerit: Function,
  createQcMerit: Function,
  destroyQcMerit: Function,
}

class QcMeritEditor extends React.Component<Props> {
  handleChange = (id, trait, value) => {
    this.props.updateQcMerit(id, this.props.qc.id, trait, value)
  }

  handleAdd = () => {
    this.props.createQcMerit(this.props.qc.id)
  }

  handleRemove = id => {
    this.props.destroyQcMerit(id, this.props.qc.id)
  }

  render() {
    const { handleChange, handleAdd, handleRemove } = this

    const qcMerits = this.props.qc_merits.map(merit => (
      <QcMeritFields
        key={merit.id}
        merit={merit}
        qc={this.props.qc}
        onMeritChange={handleChange}
        onRemoveClick={handleRemove}
      />
    ))

    return (
      <div>
        <Typography variant="title">
          Merits
          <Button onClick={handleAdd}>
            Add Merit
            <ContentAddCircle />
          </Button>
        </Typography>

        {qcMerits}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const qc = ownProps.qc
  let qc_merits = qc !== undefined ? getMeritsForQc(state, qc.id) : []

  return {
    qc_merits,
  }
}

const enhance: Enhancer<Props, ExposedProps> = connect(
  mapStateToProps,
  {
    updateQcMerit,
    createQcMerit,
    destroyQcMerit,
  }
)

export default enhance(QcMeritEditor)
