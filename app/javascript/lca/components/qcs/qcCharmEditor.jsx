// @flow
import { Component } from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import { compose } from 'redux'

import withStyles from '@mui/styles/withStyles'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ContentAddCircle from '@mui/icons-material/AddCircle'

import QcCharmFields from './qcCharmFields.jsx'
import SortableGridList from 'components/generic/SortableGridList.jsx'

import { createQcCharm, destroyQcCharm, updateQcCharm } from 'ducks/actions.js'
import { getCharmsForQc } from 'selectors'
import commonStyles from 'styles'
import type { fullQc, QcCharm, Enhancer } from 'utils/flow-types'

const SortableItem = SortableElement(({ children }) => children)

const styles = (theme) => ({
  ...commonStyles(theme),
})

type ExposedProps = {
  qc: fullQc,
}
type Props = ExposedProps & {
  qc_charms: Array<QcCharm>,
  updateQcCharm: Function,
  createQcCharm: Function,
  destroyQcCharm: Function,
  classes: Object,
}

class QcCharmEditor extends Component<Props> {
  handleChange = (id, trait) => {
    this.props.updateQcCharm(id, this.props.qc.id, trait)
  }

  handleAdd = () => {
    this.props.createQcCharm(this.props.qc.id)
  }

  handleRemove = (id) => {
    this.props.destroyQcCharm(id, this.props.qc.id)
  }

  handleSort = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return
    const charmA = this.props.qc_charms[oldIndex]
    const charmB = this.props.qc_charms[newIndex]
    const offset = charmA.sort_order > charmB.sort_order ? -1 : 1
    this.props.updateQcCharm(charmA.id, this.props.qc.id, {
      sort_order: charmB.sort_order + offset,
    })
  }

  render() {
    const { handleChange, handleAdd, handleRemove, handleSort } = this
    const { classes } = this.props

    const qcCharms = this.props.qc_charms.map((charm, i) => (
      <SortableItem key={charm.id} index={i}>
        <Grid item xs={12} md={6} lg={4}>
          <QcCharmFields
            key={charm.id}
            charm={charm}
            qc={this.props.qc}
            onCharmChange={handleChange}
            onRemoveClick={handleRemove}
          />
        </Grid>
      </SortableItem>
    ))

    return (
      <SortableGridList
        header={
          <Typography variant="h6">
            Charms
            <Button onClick={handleAdd}>
              Add Charm
              <ContentAddCircle />
            </Button>
          </Typography>
        }
        items={qcCharms}
        classes={classes}
        onSortEnd={handleSort}
        useDragHandle
        axis="x"
      />
    )
  }
}

function mapStateToProps(state, ownProps: ExposedProps) {
  const qc = ownProps.qc
  let qc_charms = qc !== undefined ? getCharmsForQc(state, qc.id) : []

  return {
    qc_charms,
  }
}

const enhance: Enhancer<Props, ExposedProps> = compose(
  connect(mapStateToProps, {
    updateQcCharm,
    createQcCharm,
    destroyQcCharm,
  }),
  withStyles(styles),
)

export default enhance(QcCharmEditor)
