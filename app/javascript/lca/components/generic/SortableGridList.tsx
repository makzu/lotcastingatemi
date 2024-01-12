import { SortableContainer } from 'react-sortable-hoc'
import Grid from '@mui/material/Grid'

const SortableGridList = SortableContainer(({ header, items, classes }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} className={classes.stickyHeader}>
      {header}
    </Grid>
    {items}
  </Grid>
))

export default SortableGridList
