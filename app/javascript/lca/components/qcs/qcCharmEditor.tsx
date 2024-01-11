import React from 'react'
import { connect } from 'react-redux'
import { SortableElement } from 'react-sortable-hoc'
import { compose } from 'recompose'
import {
  Theme,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import QcCharmFields from './qcCharmFields'
import SortableGridList from 'components/generic/SortableGridList'
import { createQcCharm, destroyQcCharm, updateQcCharm } from 'ducks/actions'
import { getCharmsForQc } from 'selectors'
import commonStyles from 'styles'
import type { fullQc, QcCharm, Enhancer } from 'utils/flow-types'
import { State } from 'ducks'
import SortableItem from 'components/generic/SortableItem'

const styles = (theme: Theme) => createStyles({ ...commonStyles(theme) })

interface ExposedProps {
  qc: fullQc
}
type Props = ExposedProps &
  WithStyles<typeof styles> & {
    qc_charms: QcCharm[]
    updateQcCharm: $TSFixMeFunction
    createQcCharm: $TSFixMeFunction
    destroyQcCharm: $TSFixMeFunction
  }

class QcCharmEditor extends React.Component<Props> {
  handleChange = (id: number, trait: Partial<fullQc>) => {
    this.props.updateQcCharm(id, this.props.qc.id, trait)
  }
  handleAdd = () => {
    this.props.createQcCharm(this.props.qc.id)
  }
  handleRemove = (id: number) => {
    this.props.destroyQcCharm(id, this.props.qc.id)
  }

  handleSort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex === newIndex) return
    const charmA = this.props.qc_charms[oldIndex]!
    const charmB = this.props.qc_charms[newIndex]!
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

function mapStateToProps(state: State, ownProps: ExposedProps) {
  const qc = ownProps.qc
  const qc_charms = qc !== undefined ? getCharmsForQc(state, qc.id) : []
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
