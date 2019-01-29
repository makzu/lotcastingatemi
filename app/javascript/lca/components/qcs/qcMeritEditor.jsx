// @flow
import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import QcMeritFields from './qcMeritFields.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import { createQcMerit, destroyQcMerit, updateQcMerit } from 'ducks/actions.js'
import { getMeritsForQc } from 'selectors'
import type { fullQc, QcMerit, Enhancer } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

type ExposedProps = {
  qc: fullQc,
  classes: Object,
}
type Props = ExposedProps & {
  qc_merits: Array<QcMerit>,
  updateQcMerit: Function,
  createQcMerit: Function,
  destroyQcMerit: Function,
}

class QcMeritEditor extends React.Component<Props> {
  handleChange = (id, trait) => {
    this.props.updateQcMerit(id, this.props.qc.id, trait)
  }

  handleAdd = () => {
    this.props.createQcMerit(this.props.qc.id)
  }

  handleRemove = id => {
    this.props.destroyQcMerit(id, this.props.qc.id)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    const meritA = this.props.qc_merits[oldIndex]
    const meritB = this.props.qc_merits[newIndex]
    const offset = meritA.sort_order > meritB.sort_order ? -1 : 1
    this.props.updateQcMerit(meritA.id, this.props.qc.id, {
      sort_order: meritB.sort_order + offset,
    })
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this
    const { classes } = this.props

    const qcMerits = this.props.qc_merits.map((merit, i) => (
      <SortableItem key={merit.id} index={i}>
        <Grid item xs={12} md={6} xl={4}>
          <QcMeritFields
            merit={merit}
            qc={this.props.qc}
            onMeritChange={handleChange}
            onRemoveClick={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))

    return (
      <SortableGridList
        header={
          <Typography variant="title">
            Merits
            <Button onClick={handleAdd}>
              Add Merit
              <ContentAddCircle />
            </Button>
          </Typography>
        }
        items={qcMerits}
        classes={classes}
        onSortEnd={handleSort}
        useDragHandle={true}
        axis="xy"
      />
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
