import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import {
  createQcCharm,
  destroyQcCharm,
  updateQcCharm,
} from '@lca/ducks/entities/qc_charm.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import { getCharmsForQc } from '@lca/selectors/qc.ts'
import commonStyles from '@lca/styles/index.ts'
import type { QC } from '@lca/types/index.ts'
import QcCharmFields from './QcCharmFields.tsx'

const styles = (theme) => ({
  ...commonStyles(theme),
})

type Props = {
  qc: QC
  classes: Object
}
const QcCharmEditor = (props: Props) => {
  const dispatch = useAppDispatch()
  const { qc, classes } = props

  const handleAdd = () => {
    dispatch(createQcCharm(qc.id))
  }

  const handleChange = (id, trait) => {
    dispatch(updateQcCharm(id, qc.id, trait))
  }

  const handleRemove = (id: number) => {
    dispatch(destroyQcCharm(id, qc.id))
  }

  const qc_charms = useAppSelector((state) => getCharmsForQc(state, qc.id))

  const qcCharms = qc_charms.map((charm, i) => (
    <SortableGridItem id={charm.id} key={charm.id} index={i}>
      <QcCharmFields
        key={charm.id}
        charm={charm}
        onCharmChange={handleChange}
        onRemoveClick={handleRemove}
      />
    </SortableGridItem>
  ))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.stickyHeader}>
        <Typography variant="h6">
          Charms
          <Button onClick={handleAdd}>
            Add Charm
            <ContentAddCircle />
          </Button>
        </Typography>
      </Grid>

      <DragDropProvider
        onDragEnd={(event) => {
          const { source } = event.operation

          if (isSortable(source)) {
            if (source.index === source.initialIndex) {
              return
            }

            handleChange(source.id as number, {
              sorting_position: source.index,
            })
          }
        }}
      >
        {qcCharms}
      </DragDropProvider>
    </Grid>
  )
}

export default withStyles(styles)(QcCharmEditor)
