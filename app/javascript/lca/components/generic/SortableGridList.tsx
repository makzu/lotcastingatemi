import type { ReactNode } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import Grid from '@material-ui/core/Grid'

interface Props {
  header: ReactNode
  items: ReactNode
  classes: any
}

const SortableGridList = ({ header, items, classes }: Props) => (
  <Grid container spacing={3}>
    <Grid item xs={12} className={classes.stickyHeader}>
      {header}
    </Grid>
    {items}
  </Grid>
)

export default SortableContainer<typeof SortableGridList>(SortableGridList)
