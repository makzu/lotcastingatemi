import { DragDropProvider } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ContentAddCircle from '@material-ui/icons/AddCircle'

import SortableGridItem from '@lca/components/shared/wrappers/SortableGridItem.tsx'
import {
  createQcMerit,
  destroyQcMerit,
  updateQcMerit,
} from '@lca/ducks/entities/qc_merit.ts'
import { useAppDispatch, useAppSelector } from '@lca/hooks/index.ts'
import { getMeritsForQc } from '@lca/selectors/qc.ts'
import commonStyles from '@lca/styles/index.ts'
import type { QC } from '@lca/types/index.ts'
import QcMeritFields from './QcMeritFields.tsx'

const styles = (theme) => ({
  ...commonStyles(theme),
})

type Props = {
  qc: QC
  classes: Object
}
const QcMeritEditor = (props: Props) => {
  const dispatch = useAppDispatch()
  const { qc, classes } = props

  const handleAdd = () => {
    dispatch(createQcMerit(qc.id))
  }

  const handleChange = (id, trait) => {
    dispatch(updateQcMerit(id, qc.id, trait))
  }

  const handleRemove = (id: number) => {
    dispatch(destroyQcMerit(id, qc.id))
  }

  const qc_merits = useAppSelector((state) => getMeritsForQc(state, qc.id))

  const qcMerits = qc_merits.map((merit, i) => (
    <SortableGridItem id={merit.id} key={merit.id} index={i}>
      <QcMeritFields
        key={merit.id}
        merit={merit}
        onMeritChange={handleChange}
        onRemoveClick={handleRemove}
      />
    </SortableGridItem>
  ))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.stickyHeader}>
        <Typography variant="h6">
          Merits
          <Button onClick={handleAdd}>
            Add Merit
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
        {qcMerits}
      </DragDropProvider>
    </Grid>
  )
}

export default withStyles(styles)(QcMeritEditor)
